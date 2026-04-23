/**
 * @title TextmodeShader.dispose
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let shader = null;
let isDisposed = false;

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

async function createShader() {
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
			float stripe = step(0.5, fract((v_uv.x + v_uv.y) * 10.0));
			o_character = vec4(stripe, 0.0, 0.0, 0.0);
			o_primaryColor = vec4(1.0, 0.75 - stripe * 0.3, 0.25 + stripe * 0.4, 1.0);
			o_secondaryColor = vec4(0.03, 0.05, 0.1, 1.0);
		}
	`;

	shader = await t.createShader(vert, frag);
	isDisposed = false;
}

t.setup(async () => {
	await createShader();
});

t.draw(() => {
	t.background(5, 6, 16);

	if (shader && !isDisposed) {
		t.shader(shader);
		t.rect(t.grid.cols - 12, t.grid.rows - 12);
		t.resetShader();
	}

	drawLabel(isDisposed ? 'shader disposed' : 'click to dispose shader', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	drawLabel(isDisposed ? 'click again to rebuild it' : 'program still valid until dispose()', Math.floor(t.grid.rows * 0.32), [120, 205, 255]);
});

t.mouseClicked(async () => {
	if (shader && !isDisposed) {
		shader.dispose();
		isDisposed = true;
		return;
	}

	await createShader();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
