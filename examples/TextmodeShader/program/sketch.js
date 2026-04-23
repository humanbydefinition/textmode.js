/**
 * @title TextmodeShader.program
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let shader = null;

function drawLabel(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.setup(async () => {
	const vert = `#version 300 es
		in vec4 a_position;
		in vec2 a_uv;
		out vec2 v_uv;
		void main() {
			gl_Position = a_position;
			v_uv = a_uv;
		}
	`;

	const frag = `#version 300 es
		precision highp float;
		in vec2 v_uv;
		layout(location = 0) out vec4 o_character;
		layout(location = 1) out vec4 o_primaryColor;
		layout(location = 2) out vec4 o_secondaryColor;

		void main() {
			float mask = step(0.5, fract(v_uv.x * 8.0));
			o_character = vec4(mask, 0.0, 0.0, 0.0);
			o_primaryColor = vec4(0.3 + v_uv.x, 0.6 + v_uv.y * 0.2, 1.0, 1.0);
			o_secondaryColor = vec4(0.02, 0.04, 0.08, 1.0);
		}
	`;

	shader = await t.createShader(vert, frag);
});

t.draw(() => {
	t.background(4, 7, 18);

	if (shader) {
		t.shader(shader);
		t.rect(t.grid.cols - 10, t.grid.rows - 10);
		t.resetShader();
	}

	drawLabel('program handle ready', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	drawLabel(`shader.program ${shader && shader.program ? 'available' : 'pending'}`, Math.floor(t.grid.rows * 0.32), [120, 205, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
