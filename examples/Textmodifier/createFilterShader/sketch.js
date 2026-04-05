/**
 * @title Textmodifier.createFilterShader
 * @author codex
 */
const t = textmode.create({
  width: 800,
  height: 600,
})

let waveShader;

t.setup(async () => {
  // Load shader from file
  waveShader = await t.createFilterShader('./shader.frag');

  // Or create from inline source
  // waveShader = await t.createFilterShader(`#version 300 es
  //   precision highp float;
  //
  //   in vec2 v_uv;
  //   in vec3 v_character;
  //   in vec4 v_primaryColor;
  //   in vec4 v_secondaryColor;
  //
  //   uniform float u_time;
  //
  //   layout(location = 0) out vec4 o_character;
  //   layout(location = 1) out vec4 o_primaryColor;
  //   layout(location = 2) out vec4 o_secondaryColor;
  //
  //   void main() {
  //     // Shader code here
  //   }
  // `);
});

t.draw(() => {
  if (waveShader) {
    t.shader(waveShader);
    t.setUniform('u_time', t.frameCount * 0.003);
    t.rect(t.grid.cols, t.grid.rows);
  }
});
