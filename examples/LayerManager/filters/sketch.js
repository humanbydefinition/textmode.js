/**
 * @title LayerManager.filters
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const filteredLayer = t.layers.add({ blendMode: 'screen', opacity: 0.8 });

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
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

	const time = t.frameCount * 0.02;

	drawCenteredText('Base Layer', 0, [240, 245, 255]);

	for (let i = 0; i < 4; i++) {
		const angle = time * 0.5 + (i / 4) * Math.PI * 2;
		const x = Math.round(Math.cos(angle) * 5 * 1.7);
		const y = Math.round(Math.sin(angle) * 5);

		t.push();
		t.translate(x, y);
		t.charColor(70 + i * 20, 160, 255);
		t.char('o');
		t.point();
		t.pop();
	}

	t.layers.base.filter('rgbShift', { time, amount: 0.005 });
});

filteredLayer.draw(() => {
	t.clear();

	const time = t.frameCount * 0.02;

	drawCenteredText('Filtered Layer', 0, [255, 200, 100]);

	for (let i = 0; i < 3; i++) {
		const angle = time * -0.7 + (i / 3) * Math.PI * 2;
		const x = Math.round(Math.cos(angle) * 3 * 1.7);
		const y = Math.round(Math.sin(angle) * 3);

		t.push();
		t.translate(x, y);
		t.charColor(255, 120, 80);
		t.char('+');
		t.point();
		t.pop();
	}

	filteredLayer.filter('rgbShift', { time: time * 1.5, amount: 0.015 });
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
