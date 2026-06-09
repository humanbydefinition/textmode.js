/**
 * @title TextmodeShader.program
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let customShader = null;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.setup(async () => {
	customShader = await t.createMaterialShader(`#version 300 es
precision highp float;
in vec2 v_uv;
uniform float u_time;
layout(location = 0) out vec4 o_character;
layout(location = 1) out vec4 o_primaryColor;
layout(location = 2) out vec4 o_secondaryColor;
void main() {
	vec2 centered = v_uv - 0.5;
	float rings = sin(length(centered) * 42.0 - u_time * 3.0);
	float scan = sin((v_uv.x + v_uv.y) * 26.0 + u_time * 2.0);
	float glyph = step(0.0, rings + scan * 0.45);
	o_character = vec4(glyph, 0.0, 0.0, 1.0);
	o_primaryColor = vec4(0.28 + glyph * 0.6, 0.82, 1.0, 1.0);
	o_secondaryColor = vec4(0.02, 0.04, 0.09, 1.0);
}`);
});

t.draw(() => {
	t.background(4, 7, 18);

	if (!customShader) return;

	t.shader(customShader);
	t.setUniform('u_time', t.frameCount * 0.025);
	t.rect(t.grid.cols, t.grid.rows);
	t.resetShader();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODESHADER.PROGRAM', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: WEBGL PROGRAM HANDLE', x, y++, 100, 220, 255);
	drawText('Filter shader draws the grid.', x, y++, 140, 160, 190);
	drawText('program exposes the raw handle.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);

	const ready = customShader && customShader.program instanceof WebGLProgram;
	const state = ready ? 'READY' : 'WAIT';
	drawText(`PROGRAM: ${state}`, x, y++, 140, 255, 180);
	drawText('TYPE: WEBGLPROGRAM', x, y++, 255, 225, 140);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
