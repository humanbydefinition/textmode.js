/**
 * @title Textmodifier.createShader
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let customShader;

t.setup(async () => {
  // Define a vertex shader that passes through position and UVs
  const vert = `#version 300 es
    in vec4 a_position;
    in vec2 a_uv;
    out vec2 v_uv;
    void main() {
      gl_Position = a_position;
      v_uv = a_uv;
    }
  `;

  // Define a fragment shader that outputs a solid color
  // Note: Must match the MRT output layout of the textmode pipeline
  const frag = `#version 300 es
    precision highp float;
    in vec2 v_uv;
    layout(location = 0) out vec4 o_character;
    layout(location = 1) out vec4 o_primaryColor;
    layout(location = 2) out vec4 o_secondaryColor;

    void main() {
       // Output character data (RG=char index/value)
       o_character = vec4(0.1, 0.0, 0.0, 0.0);
       // Output primary color (Red)
       o_primaryColor = vec4(1.0, 0.0, 0.0, 1.0);
       // Output secondary color (Transparent)
       o_secondaryColor = vec4(0.0);
    }
  `;

  customShader = await t.createShader(vert, frag);
});

t.draw(() => {
  if (customShader) {
    t.shader(customShader);
    t.rect(10, 10);
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
