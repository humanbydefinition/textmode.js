/**
 * @title LayerManager.filters
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const filteredLayer = t.layers.add({ blendMode: 'screen', opacity: 0.8 });
const labelLayer = t.layers.add();

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}

	t.pop();
}

function drawOrbit(count, speed, radius, rgb, glyph) {
	for (let i = 0; i < count; i++) {
		const angle = t.frameCount * 0.02 * speed + (i / count) * Math.PI * 2;
		const x = Math.round(Math.cos(angle) * radius * 1.7);
		const y = Math.round(Math.sin(angle) * radius);

		t.push();
		t.translate(x, y);
		t.charColor(rgb[0] + i * 20, rgb[1], rgb[2]);
		t.char(glyph);
		t.point();
		t.pop();
	}
}

t.setup(async () => {
	await t.layers.filters.register(
		'rgbShift',
		`#version 300 es
		precision highp float;
		uniform sampler2D u_texture;
		uniform float u_time;
		uniform float u_amount;
		in vec2 v_uv;
		out vec4 fragColor;
		void main() {
			vec2 shift = vec2(u_amount * sin(u_time), 0.0);
			float r = texture(u_texture, v_uv + shift).r;
			float g = texture(u_texture, v_uv).g;
			float b = texture(u_texture, v_uv - shift).b;
			float a = texture(u_texture, v_uv).a;
			fragColor = vec4(r, g, b, a);
		}`,
		{
			u_time: ['time', 0],
			u_amount: ['amount', 0.01],
		}
	);
});

t.draw(() => {
	t.background(6, 10, 22);
	drawOrbit(4, 0.5, 5, [70, 160, 255], 'o');
});

filteredLayer.draw(() => {
	t.clear();

	const time = t.frameCount * 0.02;
	drawOrbit(3, -0.7, 3, [255, 120, 80], '+');

	filteredLayer.filter('rgbShift', { time: time * 1.5, amount: 0.015 });
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('LAYERMANAGER.FILTERS', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: GLOBAL FILTER MANAGER', x, y++, [100, 220, 255]);
	drawText('Registers a custom RGB shift.', x, y++, [140, 160, 190]);
	drawText('Applies it only to one layer.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('FILTER: rgbShift', x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
