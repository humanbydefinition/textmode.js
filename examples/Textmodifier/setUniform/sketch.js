/**
 * @title Textmodifier.setUniform
 * @author codex
 */
// Passing CPU values to Shaders
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let pulseShader;
t.setup(async () => {
  pulseShader = await t.createFilterShader(`#version 300 es
    precision highp float;
    in vec2 v_uv;
    uniform float u_time;
    layout(location = 0) out vec4 o_char;
    layout(location = 1) out vec4 o_col;
    layout(location = 2) out vec4 o_bg;
    void main() {
      float p = 0.5 + 0.5 * sin(u_time + v_uv.x);
      o_char = vec4(p, 0.0, 0.0, 1.0);
      o_col = vec4(v_uv, 1.0, 1.0);
      o_bg = vec4(0.0, 0.0, 0.0, 1.0);
    }
  `);
});

t.draw(() => {
  t.background(0);
  if (pulseShader) {
    t.shader(pulseShader);
    // Sync CPU state to GPU uniform
    t.setUniform('u_time', t.frameCount * 0.001);
    t.rect(t.grid.cols, t.grid.rows);
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
