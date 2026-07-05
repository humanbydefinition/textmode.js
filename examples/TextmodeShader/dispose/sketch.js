/**
 * @title TextmodeShader.dispose
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let customShader = null;
let isDisposed = false;

function drawText(text, x, y, r = 200, g = 220, b = 255) {
	t.push();
	t.translate(x, y);
	t.charColor(r, g, b);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

async function createShader() {
	const vert = `#version 300 es
		in vec4 a_position; in vec2 a_uv; out vec2 v_uv;
		void main() { gl_Position = a_position; v_uv = a_uv; }`;
	const frag = `#version 300 es
		precision highp float; in vec2 v_uv;
		layout(location = 0) out vec4 o_char;
		layout(location = 1) out vec4 o_fg;
		layout(location = 2) out vec4 o_bg;
		void main() {
			float s = step(0.5, fract((v_uv.x + v_uv.y) * 10.0));
			o_char = vec4(s, 0.0, 0.0, 0.0);
			o_fg = vec4(1.0, 0.75 - s * 0.3, 0.25 + s * 0.4, 1.0);
			o_bg = vec4(0.03, 0.05, 0.1, 1.0);
		}`;
	customShader = await t.createShader(vert, frag);
	isDisposed = false;
}

t.setup(async () => {
	await createShader();
});

t.draw(() => {
	t.background(6, 10, 22);

	if (customShader && !isDisposed) {
		t.push();
		t.shader(customShader);
		t.charColor(255, 180, 100);
		t.rect(14, 6);
		t.resetShader();
		t.pop();
	} else {
		t.push();
		t.charColor(40, 50, 80);
		t.char('.');
		t.rect(14, 6);
		t.pop();
	}
});

t.mouseClicked(async () => {
	if (customShader && !isDisposed) {
		customShader.dispose();
		isDisposed = true;
	} else {
		await createShader();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('DISPOSE', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Frees the GL program handle.', x, y++, 100, 220, 255);
	drawText('Click to dispose / rebuild.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	const status = isDisposed ? 'OFFLINE' : 'ACTIVE';
	const sr = isDisposed ? 255 : 140;
	const sg = isDisposed ? 100 : 255;
	drawText(`GPU STATUS: ${status}`, x, y++, sr, sg, 140);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
