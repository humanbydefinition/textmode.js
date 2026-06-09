/**
 * @title Textmodifier.createShader
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let shaderObj;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.setup(async () => {
	const vert = `#version 300 es
	in vec4 a_position;
	in vec2 a_texCoord;
	out vec2 v_uv;
	void main(){gl_Position=a_position;v_uv=a_texCoord;}`;
	const frag = `#version 300 es
	precision highp float;
	in vec2 v_uv;
	uniform float u_time;
	layout(location=0) out vec4 o_character;
	layout(location=1) out vec4 o_primaryColor;
	layout(location=2) out vec4 o_secondaryColor;
	void main(){float v=fract(v_uv.x*8.0+u_time);o_character=vec4(v,0,0,1);o_primaryColor=vec4(v,0.8,1.0,1);o_secondaryColor=vec4(0.02,0.04,0.08,1);}`;
	shaderObj = await t.createShader(vert, frag);
});

t.draw(() => {
	t.background(6, 10, 22);
	if (shaderObj) {
		t.shader(shaderObj);
		t.setUniform('u_time', t.frameCount * 0.02);
		t.rect(t.grid.cols, t.grid.rows);
		t.resetShader();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CREATESHADER', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CUSTOM SHADER', x, y++, 100, 220, 255);
	drawText('Shader affects the main drawing.', x, y++, 140, 160, 190);
	drawText('resetShader restores default.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(shaderObj ? 'SHADER: READY' : 'SHADER: WAIT', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
