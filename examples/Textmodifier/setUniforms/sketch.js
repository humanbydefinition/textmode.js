/**
 * @title Textmodifier.setUniforms
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let customShader = null;

t.setup(async () => {
	customShader = await t.createMaterialShader(`#version 300 es
precision highp float;
in vec2 v_uv;
uniform float u_time;
uniform vec2 u_mouse;
layout(location = 0) out vec4 o_character;
layout(location = 1) out vec4 o_primaryColor;
layout(location = 2) out vec4 o_secondaryColor;
void main() {
	float wave = sin((v_uv.x + v_uv.y + u_time) * 24.0);
	float glyph = step(0.0, wave);
	float glow = 0.4 + 0.6 * distance(v_uv, u_mouse);
	o_character = vec4(glyph, 0.0, 0.0, 1.0);
	o_primaryColor = vec4(0.3, glow, 1.0, 1.0);
	o_secondaryColor = vec4(0.02, 0.03, 0.08, 1.0);
}`);
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(0);
	if (!customShader) return;
	t.shader(customShader);
	const time = t.frameCount * 0.02;
	const mx = (Math.sin(time) + 1) * 0.5;
	const my = (Math.cos(time) + 1) * 0.5;
	t.setUniforms({ u_time: time, u_mouse: [mx, my] });
	t.rect(t.grid.cols, t.grid.rows);
	t.resetShader();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.SETUNIFORMS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CUSTOM SHADER', x, y++, 100, 220, 255);
	drawText('Uniforms drive GLSL state.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('UNIFORMS: 2', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
