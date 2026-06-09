#version 300 es
precision highp float;

// Shift map texture (single map for all channels)
uniform sampler2D u_shiftMap;

// Noise textures for border injection
uniform sampler2D u_noiseCharacter;
uniform sampler2D u_noisePrimaryColor;

// Previous frame textures (from previous push framebuffer)
uniform sampler2D u_previousCharacter;      // Previous character data
uniform sampler2D u_previousPrimaryColor;   // Previous primary color data
uniform sampler2D u_previousSecondaryColor; // Previous secondary color data

uniform vec2 u_gridSize;          // grid dimensions (cols, rows)

// MRT outputs
layout(location = 0) out vec4 o_character;      // Character data
layout(location = 1) out vec4 o_primaryColor;   // Primary color
layout(location = 2) out vec4 o_secondaryColor; // Secondary color

// Helper function to get shift values from the shared shift map
vec2 getShift(ivec2 coord) {
    vec2 u_resolution = u_gridSize;
    vec2 texCoord = (vec2(coord) + 0.5f) / u_resolution;
    vec4 shiftColor = texture(u_shiftMap, texCoord);

    // Decode shifts: -1, 0, or 1
    float shiftX = (shiftColor.r * 2.0f) - 1.0f;
    float shiftY = (shiftColor.g * 2.0f) - 1.0f;

    // Round to nearest integer
    float shiftXRounded = floor(shiftX + 0.5f);
    float shiftYRounded = floor(shiftY + 0.5f);

    return vec2(clamp(shiftXRounded, -1.0f, 1.0f), clamp(shiftYRounded, -1.0f, 1.0f));
}

// Helper function to sample from previous frame with shift applied
vec4 sampleShifted(sampler2D previousTexture, ivec2 pixelCoord) {
    vec2 u_resolution = u_gridSize;
    
    vec2 shift = getShift(pixelCoord);
    ivec2 shiftInt = ivec2(shift);
    ivec2 shiftedCoord = pixelCoord + shiftInt;

    vec2 shiftedTexCoord = (vec2(shiftedCoord) + 0.5f) / u_resolution;
    return texture(previousTexture, shiftedTexCoord);
}

bool isBorder(ivec2 coord, vec2 size) {
    return coord.x == 0 || coord.y == 0 || coord.x == int(size.x) - 1 || coord.y == int(size.y) - 1;
}

void main() {
    ivec2 pixelCoord = ivec2(gl_FragCoord.xy);
    vec2 texCoord = (vec2(pixelCoord) + 0.5f) / u_gridSize;

    // For border pixels, sample from noise; otherwise, sample shifted previous
    if (isBorder(pixelCoord, u_gridSize)) {
        o_character = texture(u_noiseCharacter, texCoord);
        o_primaryColor = texture(u_noisePrimaryColor, texCoord);
        o_secondaryColor = vec4(0.0f, 0.0f, 0.0f, 0.0f);
    } else {
        vec4 ch = sampleShifted(u_previousCharacter, pixelCoord);
        vec4 pc = sampleShifted(u_previousPrimaryColor, pixelCoord);
        vec4 sc = sampleShifted(u_previousSecondaryColor, pixelCoord);

        o_character = ch;
        o_primaryColor = pc;
        o_secondaryColor = sc;
    }
}