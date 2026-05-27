/**
 * @title Textmodifier.createFilterShader
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let shaderObj;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
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

t.setup(async () => {
	shaderObj = await t.createFilterShader(`#version 300 es
	precision highp float;
	in vec2 v_uv;
	uniform sampler2D u_texture;
	uniform float u_time;
	out vec4 fragColor;
	void main(){vec4 c=texture(u_texture,v_uv);fragColor=vec4(c.rgb*(0.7+0.3*sin(u_time)),c.a);}`);
});

t.draw(() => {
	t.background(6, 10, 22);
	t.char('#');
	t.charColor(140, 220, 255);
	t.rect(16, 8);
	if (shaderObj) t.filter(shaderObj, { u_time: t.frameCount * 0.03 });
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CREATEFILTERSHADER', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CUSTOM FILTER', x, y++, 100, 220, 255);
	drawText('Shader affects the main drawing.', x, y++, 140, 160, 190);
	drawText('resetShader restores default.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(shaderObj ? 'FILTER: READY' : 'FILTER: WAIT', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
