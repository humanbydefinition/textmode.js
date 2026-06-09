#version 300 es
precision highp float;

// User uniforms
uniform float u_frameCount;
uniform vec3 u_primaryColor; // Palette-selected color for the entire layer
uniform vec2 u_gridSize;     // Framebuffer dimensions
uniform vec2 u_charValues[256]; // List of RG character values to select from
uniform int u_charCount;     // Number of character values in the array

// MRT outputs
layout(location = 0) out vec4 o_character;      // Character data
layout(location = 1) out vec4 o_primaryColor;   // Primary color
layout(location = 2) out vec4 o_secondaryColor; // Secondary color

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898f, 78.233f))) * 43758.5453f);
}

float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1f, 311.7f))) * 43758.5453f);
}

float hash3(vec2 p) {
    return fract(sin(dot(p, vec2(269.5f, 183.3f))) * 43758.5453f);
}

float computeGlyphFlags(vec2 cell, float noise) {
    // Generate pseudo-random flags based on cell position and noise
    bool invertFlag = hash2(cell + vec2(17.0f, 73.0f) + noise) > 0.66f;
    bool flipXFlag = hash3(cell + vec2(53.0f, -29.0f) + noise) > 0.5f;
    bool flipYFlag = hash2(cell + vec2(-47.0f, 113.0f) + noise * 2.0f) > 0.4f;

    // Pack flags into a single byte: bit0=invert, bit1=flipX, bit2=flipY
    int packedFlags = int(invertFlag) | (int(flipXFlag) << 1) | (int(flipYFlag) << 2);
    return float(packedFlags) / 255.0f;
}

void main() {
    vec2 st = gl_FragCoord.xy;
    
    // Simple animated noise for selection
    float time = u_frameCount * 0.01f;
    vec2 p = st + time;
    float noise = hash(floor(p));

    // Use noise to select a character from the uniform array
    int charIndex = int(noise * float(u_charCount)) % u_charCount;
    vec2 selectedChar = u_charValues[charIndex];

    // Compute glyph flags (invert, flipX, flipY) packed into blue channel
    float glyphFlags = computeGlyphFlags(floor(st), noise);

    // Output selected character RG values with glyph flags
    o_character = vec4(selectedChar.r, selectedChar.g, glyphFlags, 1.0f);
    o_primaryColor = vec4(u_primaryColor, 1.0f);
    o_secondaryColor = vec4(0.0f, 0.0f, 0.0f, 0.0f);
}