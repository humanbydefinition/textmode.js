/**
 * @title Textmodifier.createMaterialShader
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let materialShader = null;
let glyphA = [0, 0, 0];
let glyphB = [0, 0, 0];

t.setup(async () => {
	glyphA = t.font.characterMap.get('#')?.color ?? t.font.characters[1].color;
	glyphB = t.font.characterMap.get('@')?.color ?? t.font.characters[2].color;
	materialShader = await t.createMaterialShader(`#version 300 es
precision highp float;
in vec2 v_uv;
uniform float u_time;
uniform vec3 u_glyphA;
uniform vec3 u_glyphB;
layout(location = 0) out vec4 o_character;
layout(location = 1) out vec4 o_primaryColor;
layout(location = 2) out vec4 o_secondaryColor;
void main() {
	float rings = sin((distance(v_uv, vec2(0.5)) - u_time) * 32.0);
	float glyph = step(0.0, rings);
	vec3 glyphId = mix(u_glyphA, u_glyphB, glyph);
	vec3 primary = mix(vec3(0.2, 0.8, 1.0), vec3(1.0, 0.45, 0.25), glyph);
	o_character = vec4(glyphId.xy, 0.0, 0.0);
	o_primaryColor = vec4(primary, 1.0);
	o_secondaryColor = vec4(0.01, 0.02, 0.05, 1.0);
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
	if (!materialShader) return;
	const time = t.frameCount * 0.003;
	t.perspective(58, 0.1, 4096);
	t.camera(16, -10, 42, 0, 0, 0);
	t.shader(materialShader);
	t.setUniforms({ u_time: time, u_glyphA: glyphA, u_glyphB: glyphB });
	t.rotateY(t.frameCount);
	t.sphere(8);
	t.resetShader();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.CREATEMATERIALSHADER', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: GEOMETRY SHADER', x, y++, 100, 220, 255);
	drawText('Fragment shader affects shapes.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(materialShader ? 'SHADER: READY' : 'SHADER: WAIT', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
