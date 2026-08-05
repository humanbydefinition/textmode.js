/**
 * @title LayerManager.filters
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const filteredLayer = t.layers.add({ blendMode: t.BLEND_SCREEN, opacity: 0.8 });
const labelLayer = t.layers.add();

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

t.setup(async () => {
	await t.layers.filters.register(
		'ripple',
		`#version 300 es
precision highp float;
uniform sampler2D u_texture;
uniform float u_time;
uniform float u_amount;
in vec2 v_uv;
out vec4 fragColor;
void main() {
	float d = length(v_uv - 0.5);
	float w = sin(d * 8.0 - u_time) * u_amount;
	vec2 uv = v_uv + vec2(w * cos(d * 3.0), w * sin(d * 3.0));
	fragColor = texture(u_texture, clamp(uv, 0.0, 1.0));
}`,
		{ u_time: ['time', 0], u_amount: ['amount', 0.025] }
	);
});

t.draw(() => {
	t.background(6, 10, 22);

	const tc = t.frameCount * 0.022;
	for (let i = 0; i < 75; i++) {
		const p = (i / 75) * Math.PI * 2;
		const r = 3 + 6 * ((i % 8) / 8) + Math.sin(tc + i * 0.15) * 1.2;
		const a = p + tc * 0.35 * ((i % 3) - 1);
		const x = Math.round(Math.cos(a) * r * 1.5);
		const y = Math.round(Math.sin(a) * r);

		t.push();
		t.translate(x, y);
		t.charColor(30 + i * 0.8, 60 + i * 0.4, 110 + i * 0.3);
		t.char('.');
		t.point();
		t.pop();
	}
});

filteredLayer.draw(() => {
	t.clear();

	const tc = t.frameCount * 0.028;
	for (let i = 0; i < 60; i++) {
		const p = (i / 60) * Math.PI * 2;
		const r = 2 + 4 * ((i % 6) / 6) + Math.sin(tc * 0.8 + i * 0.22) * 1;
		const a = p - tc * 0.5 * ((i % 3) + 1);
		const x = Math.round(Math.cos(a) * r * 1.5);
		const y = Math.round(Math.sin(a) * r);
		const hue = Math.sin(a + tc) * 0.4 + 0.6;

		t.push();
		t.translate(x, y);
		t.charColor(200 + hue * 55, 100 + hue * 70, 50 + hue * 40);
		t.char('*');
		t.point();
		t.pop();
	}

	filteredLayer.filter('ripple', { time: tc * 2, amount: 0.022 });
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;

	drawText('LAYERMANAGER.FILTERS', left + 3, y++, [100, 255, 140]);
	drawText('------------------------------------', left + 3, y++, [80, 100, 150]);
	drawText('CONCEPT: GLOBAL FILTER MANAGER', left + 3, y++, [100, 220, 255]);
	drawText('Registers a custom ripple filter.', left + 3, y++, [140, 160, 190]);
	drawText('FILTER: ripple', left + 3, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
