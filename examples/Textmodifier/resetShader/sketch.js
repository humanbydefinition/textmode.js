/**
 * @title Textmodifier.resetShader
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let portalShader;

t.setup(async() => {
  portalShader = await t.createFilterShader(`#version 300 es
    precision highp float;
    in vec2 v_uv;
    uniform float u_time;
    layout(location = 0) out vec4 o_char;
    layout(location = 1) out vec4 o_prim;
    layout(location = 2) out vec4 o_sec;

    void main() {
      vec2 p = v_uv * 2.0 - 1.0;
      float r = length(p);
      float a = atan(p.y, p.x);

      // Characters: slow/spatial pattern (avoid rapid flickering)
      float charPattern = floor(r * 8.0) / 8.0 + sin(a * 6.0 + u_time * 0.3) * 0.1;
      o_char = vec4(charPattern, 0.0, 0.0, 1.0);

      // Colors: can animate rapidly for smooth visual effect
      float wave = sin(r * 20.0 - u_time * 5.0 + sin(a * 10.0));
      o_prim = vec4(0.5 + 0.5 * cos(u_time + r * 2.0), 0.2 + wave * 0.3, 0.8, 1.0);
      o_sec = vec4(0.0);
    }
  `);
});

t.draw(() => {
  t.background(0);

  if (portalShader) {
    t.shader(portalShader);
    t.setUniform('u_time', t.frameCount * 0.02);

    // Draw the portal background
    t.rect(t.grid.cols, t.grid.rows);
  }

  // Reset to default shader for foreground objects
  t.resetShader();

  // Draw floating objects in front of the portal
  const count = 8;
  for (let i = 0; i < count; i++) {
    const angle = t.frameCount * 0.05 + (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * 15;
    const y = Math.sin(angle) * 15;

    t.push();
    t.translate(x, y);
    t.rotateZ(angle * 2);
    t.char('♦');
    t.charColor(255, 200, 100);
    t.rect(5, 5);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
