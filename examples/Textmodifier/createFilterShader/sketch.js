/**
 * @title Textmodifier.createFilterShader
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let shaderObj;
let glyphA = [0, 0, 0];
let glyphB = [0, 0, 0];

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}
t.setup(async () => {
	glyphA = t.font.characterMap.get('#')?.color ?? t.font.characters[1].color;
	glyphB = t.font.characterMap.get('@')?.color ?? t.font.characters[2].color;
	shaderObj = await t.createFilterShader(`#version 300 es
precision highp float;
in vec2 v_uv;
uniform float u_time;
uniform vec3 u_glyphA;
uniform vec3 u_glyphB;
layout(location = 0) out vec4 o_character;
layout(location = 1) out vec4 o_primaryColor;
layout(location = 2) out vec4 o_secondaryColor;
void main() {
	float stripe = step(0.5, fract((v_uv.x + u_time) * 10.0));
	vec3 glyphId = mix(u_glyphA, u_glyphB, stripe);
	vec3 primary = mix(vec3(0.3, 0.8, 1.0), vec3(1.0, 0.42, 0.22), stripe);
	o_character = vec4(glyphId.xy, 0.0, 0.0);
	o_primaryColor = vec4(primary, 1.0);
	o_secondaryColor = vec4(0.02, 0.03, 0.08 + stripe * 0.12, 1.0);
}`);
});

t.draw(() => {
	t.background(6, 10, 22);
	if (shaderObj) {
		const time = t.frameCount * 0.02;
		t.perspective(58, 0.1, 4096);
		t.camera(16, -10, 42, 0, 0, 0);
		t.shader(shaderObj);
		t.setUniforms({ u_time: time * 0.1, u_glyphA: glyphA, u_glyphB: glyphB });
		t.push();
		t.rotateZ(time * 40);
		t.rect(16, 8);
		t.pop();
		t.resetShader();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CREATEFILTERSHADER', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: COMPAT ALIAS', x, y++, 100, 220, 255);
	drawText('Use createMaterialShader now.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(shaderObj ? 'SHADER: READY' : 'SHADER: WAIT', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
