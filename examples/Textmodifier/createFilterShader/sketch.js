/**
 * @title Textmodifier.createFilterShader
 * @author codex
 */
const t = textmode.create({
	width: 800,
	height: 600,
});

let waveShader;

t.setup(async () => {
	waveShader = await t.createFilterShader('./shader.frag');

	// Or create from inline source
	//   precision highp float;
	//   in vec2 v_uv;
	//   in vec3 v_character;
	//   layout(location = 0) out vec4 o_character;
	// `);
});

t.draw(() => {
	if (waveShader) {
		t.shader(waveShader);
		t.setUniform('u_time', t.frameCount * 0.003);
		t.rect(t.grid.cols, t.grid.rows);
	}
});
