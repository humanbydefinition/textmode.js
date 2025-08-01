precision mediump float;

varying vec2 v_texCoord;

uniform int u_bins;
uniform float u_frameCount;

// Improved smooth noise function
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    // Smooth interpolation curve
    f = f * f * (3.0 - 2.0 * f);
    
    // Four corner values
    float a = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453);
    float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(127.1, 311.7))) * 43758.5453);
    float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
    float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
    
    // Bilinear interpolation
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
    vec2 uv = v_texCoord * 8.0; // Scale for noise frequency
    float time = u_frameCount * 0.02;
    
    // Multi-octave noise for more detail
    float n = noise(uv + time) * 0.5 +
              noise(uv * 2.0 + time * 1.5) * 0.25 +
              noise(uv * 4.0 + time * 2.0) * 0.125;
    
    // Quantize if bins are specified
    if (u_bins > 1) {
        n = floor(n * float(u_bins)) / float(u_bins - 1);
    }
    
    gl_FragColor = vec4(vec3(n), 1.0);
}