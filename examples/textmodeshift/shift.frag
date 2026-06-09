#version 300 es
precision highp float;

// Inputs from vertex shader
in vec2 v_uv;

uniform float u_frameCount;
uniform vec2 u_gridSize;          // grid dimensions (cols, rows)

// Rectangle uniforms - 16 rectangles (x, y, width, height) in pixel coordinates
uniform vec4 u_rect0;
uniform vec4 u_rect1;
uniform vec4 u_rect2;
uniform vec4 u_rect3;
uniform vec4 u_rect4;
uniform vec4 u_rect5;
uniform vec4 u_rect6;
uniform vec4 u_rect7;
uniform vec4 u_rect8;
uniform vec4 u_rect9;
uniform vec4 u_rect10;
uniform vec4 u_rect11;
uniform vec4 u_rect12;
uniform vec4 u_rect13;
uniform vec4 u_rect14;
uniform vec4 u_rect15;

// MRT outputs
layout(location = 0) out vec4 o_character;      // Character data
layout(location = 1) out vec4 o_primaryColor;   // Primary color
layout(location = 2) out vec4 o_secondaryColor; // Secondary color

// Pseudo-random number generator for temporal smoothing
float random(vec2 st, float seed) {
    return fract(sin(dot(st, vec2(127.1f, 311.7f)) + seed) * 43758.5453f);
}

// Checks if a point is inside a rectangle defined by bottom-left and top-right corners
bool insideBox(vec2 point, vec2 bottomLeft, vec2 topRight) {
    return all(greaterThanEqual(point, bottomLeft)) && all(lessThan(point, topRight));
}

void main() {
    vec2 u_resolution = u_gridSize;
    
    float u_time = u_frameCount * 0.01;
    
    // Calculate texel size
    vec2 texelSize = 1.0f / u_resolution;
    vec2 offset = vec2(0.0f);

    // Array to hold all rectangle uniforms
    vec4 rects[16];
    rects[0] = u_rect0;
    rects[1] = u_rect1;
    rects[2] = u_rect2;
    rects[3] = u_rect3;
    rects[4] = u_rect4;
    rects[5] = u_rect5;
    rects[6] = u_rect6;
    rects[7] = u_rect7;
    rects[8] = u_rect8;
    rects[9] = u_rect9;
    rects[10] = u_rect10;
    rects[11] = u_rect11;
    rects[12] = u_rect12;
    rects[13] = u_rect13;
    rects[14] = u_rect14;
    rects[15] = u_rect15;

    // Arrays to store normalized bottom-left and top-right coordinates of rectangles
    vec2 rectBottomLeft[16];
    vec2 rectTopRight[16];

    for(int i = 0; i < 16; i++) {
        rectBottomLeft[i] = rects[i].xy / u_resolution;
        rectTopRight[i] = (rects[i].xy + rects[i].zw) / u_resolution;
    }

    // Check each rectangle and assign corresponding offset
    if(insideBox(v_uv, rectBottomLeft[0], rectTopRight[0])) {
        // Rectangle 0: Shift diagonally up-left
        offset = texelSize;
    } else if(insideBox(v_uv, rectBottomLeft[1], rectTopRight[1])) {
        // Rectangle 1: Shift diagonally down-left
        offset = vec2(texelSize.x, -texelSize.y);
    } else if(insideBox(v_uv, rectBottomLeft[2], rectTopRight[2])) {
        // Rectangle 2: Shift diagonally up-right
        offset = vec2(-texelSize.x, texelSize.y);
    } else if(insideBox(v_uv, rectBottomLeft[3], rectTopRight[3])) {
        // Rectangle 3: Shift diagonally down-right
        offset = -texelSize;
    } else if(insideBox(v_uv, rectBottomLeft[4], rectTopRight[4])) {
        // Rectangle 4: Shift left
        offset = vec2(texelSize.x, 0.0f);
    } else if(insideBox(v_uv, rectBottomLeft[5], rectTopRight[5])) {
        // Rectangle 5: Shift right
        offset = vec2(-texelSize.x, 0.0f);
    } else if(insideBox(v_uv, rectBottomLeft[6], rectTopRight[6])) {
        // Rectangle 6: Shift up
        offset = vec2(0.0f, texelSize.y);
    } else if(insideBox(v_uv, rectBottomLeft[7], rectTopRight[7])) {
        // Rectangle 7: Shift down
        offset = vec2(0.0f, -texelSize.y);
    } else if(insideBox(v_uv, rectBottomLeft[8], rectTopRight[8])) {
        // Rectangle 8: Horizontal zig-zag
        float adjustedY = gl_FragCoord.y - rects[8].y;
        float row = mod(floor(adjustedY), 2.0f);
        offset = (row < 1.0f) ? vec2(texelSize.x, 0.0f) : vec2(-texelSize.x, 0.0f);
    } else if(insideBox(v_uv, rectBottomLeft[9], rectTopRight[9])) {
        // Rectangle 9: Vertical zig-zag
        float adjustedX = gl_FragCoord.x - rects[9].x;
        float column = mod(floor(adjustedX), 2.0f);
        offset = (column < 1.0f) ? vec2(0.0f, texelSize.y) : vec2(0.0f, -texelSize.y);
    } else if(insideBox(v_uv, rectBottomLeft[10], rectTopRight[10])) {
        // Rectangle 10: Horizontal split based on Y position
        float centerY = rects[10].y + rects[10].w * 0.5f;
        offset.x += (gl_FragCoord.y > centerY) ? texelSize.x : -texelSize.x;
    } else if(insideBox(v_uv, rectBottomLeft[11], rectTopRight[11])) {
        // Rectangle 11: Vertical split based on X position
        float centerX = rects[11].x + rects[11].z * 0.5f;
        offset.y += (gl_FragCoord.x > centerX) ? texelSize.y : -texelSize.y;
    } else if(insideBox(v_uv, rectBottomLeft[12], rectTopRight[12])) {
        // Rectangle 12: Horizontal shear to the left
        float shearFactor = 0.5f; // Adjust for more or less shear
        float offsetX = mod(floor(gl_FragCoord.y * shearFactor), 2.0f) * texelSize.x;
        offset.x += offsetX;
    } else if(insideBox(v_uv, rectBottomLeft[13], rectTopRight[13])) {
        // Rectangle 13: Vertical shear upwards
        float shearFactor = 0.5f; // Adjust for more or less shear
        float offsetY = mod(floor(gl_FragCoord.x * shearFactor), 2.0f) * texelSize.y;
        offset.y += offsetY;
    } else if(insideBox(v_uv, rectBottomLeft[14], rectTopRight[14])) {
        // Rectangle 14: Horizontal shear to the right
        float shearFactor = 0.5f; // Adjust for more or less shear
        float offsetX = mod(floor(gl_FragCoord.y * shearFactor), 2.0f) * texelSize.x;
        offset.x -= offsetX;
    } else if(insideBox(v_uv, rectBottomLeft[15], rectTopRight[15])) {
        // Rectangle 15: Vertical shear downwards
        float shearFactor = 0.5f; // Adjust for more or less shear
        float offsetY = mod(floor(gl_FragCoord.x * shearFactor), 2.0f) * texelSize.y;
        offset.y -= offsetY;
    } else {
        // Default case: No offset
        offset = vec2(0.0f);
    }

    // Create unique seed for this pixel using position and time
    vec2 pixelSeed = vec2(gl_FragCoord.x, gl_FragCoord.y);
    float temporalSeed = u_time * 0.1f; // Slow temporal variation
    float dampingProbability = random(pixelSeed, temporalSeed);

    // Movement damping: 15% chance to not move (stay stationary)
    if(dampingProbability < 0.15f) {
        offset = vec2(0.0f);
    }

    // Convert offset to pixel space and round to nearest integer
    vec2 offsetInPixels = floor(offset * u_resolution + 0.5f);

    // Clamp the offset to be within [-1, 1]
    offsetInPixels = clamp(offsetInPixels, -1.0f, 1.0f);

    // Map the clamped offset to color values to decode later for applying the pixel shift/push
    float shiftXColor = (offsetInPixels.x + 1.0f) * 0.5f;
    float shiftYColor = (offsetInPixels.y + 1.0f) * 0.5f;

    // Create the shift result as a vec4
    vec4 shiftResult = vec4(shiftXColor, shiftYColor, 0.0f, 1.0f);

    o_character = shiftResult;
    o_primaryColor = shiftResult;
    o_secondaryColor = vec4(shiftResult.rgb, 0.0f);
}