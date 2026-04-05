/**
 * @title Textmodifier.shader
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let glitchShader;

t.setup(async() => {
    glitchShader = await t.createFilterShader(`#version 300 es
  precision highp float;
  in vec2 v_uv;
  uniform float u_intensity;
  layout(location = 0) out vec4 o_character;
  layout(location = 1) out vec4 o_primaryColor;
  layout(location = 2) out vec4 o_secondaryColor;

  void main() {
    vec2 offset = vec2(sin(v_uv.y * 50.0) * u_intensity, 0.0);
    float pattern = fract(v_uv.x * 20.0 + offset.x);
    vec3 color = vec3(pattern, 1.0 - pattern, 0.5);
    o_character = vec4(pattern, 0.0, 0.0, 0.0);
    o_primaryColor = vec4(color, 1.0);
    o_secondaryColor = vec4(color * 0.5, 1.0);
  }
`);
});

t.draw(() => {
    t.shader(glitchShader);
    t.setUniform('u_intensity', Math.sin(t.frameCount * 0.1) * 0.02);

    // Draw multiple shapes with the same shader
    t.translate(10, 10);
    t.rect(20, 20);
    t.translate(25, 0);
    t.rect(20, 20);

    t.resetShader(); // Reset to default when done
});
