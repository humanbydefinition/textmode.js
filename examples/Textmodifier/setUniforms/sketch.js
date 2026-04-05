/**
 * @title Textmodifier.setUniforms
 * @author codex
 */
// Bulk uniform updates
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let ripple;
t.setup(async () => {
  ripple = await t.createFilterShader(`#version 300 es
    precision highp float;
    in vec2 v_uv;
    uniform float u_time; uniform vec2 u_mouse;
    layout(location = 0) out vec4 o_c;
    layout(location = 1) out vec4 o_p;
    layout(location = 2) out vec4 o_s;
    void main() {
      float d = length(v_uv - u_mouse);
      float w = 0.5 + 0.5 * sin(d * 20.0 - u_time);
      o_c = vec4(w, 0.0, 0.0, 1.0);
      o_p = vec4(0.2, 0.5, 1.0, 1.0);
      o_s = vec4(0.0);
    }
  `);
});

t.draw(() => {
  t.background(0);
  if (ripple) {
    t.shader(ripple);
    t.setUniforms({
      u_time: t.frameCount * 0.05,
      u_mouse: [t.mouse.x, t.mouse.y]
    });
    t.rect(t.grid.cols, t.grid.rows);
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
