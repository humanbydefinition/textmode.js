/**
 * @title LayerManager.filters
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

const prismLayer = t.layers.add({ blendMode: 'screen', opacity: 0.85 });

t.setup(async () => {
	await t.layers.filters.register(
		'spectralPulse',
		`#version 300 es
		precision highp float;
		uniform sampler2D u_texture;
		uniform float u_time;
		uniform float u_amount;
		uniform float u_twist;
		in vec2 v_uv;
		out vec4 fragColor;
		void main() {
			vec2 center = vec2(0.5);
			vec2 delta = v_uv - center;
			float dist = length(delta);
			vec2 dir = dist > 0.0 ? delta / dist : vec2(0.0);
			float angle = u_twist * dist * sin(u_time * 0.7);
			mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
			vec2 uv = center + rot * delta;
			vec2 shift = dir * u_amount * (0.4 + 0.6 * sin(dist * 28.0 - u_time * 6.0));
			float r = texture(u_texture, uv + shift).r;
			float g = texture(u_texture, uv).g;
			float b = texture(u_texture, uv - shift).b;
			float a = texture(u_texture, uv).a;
			fragColor = vec4(r, g, b, a);
		}`,
		{
			u_time: ['time', 0],
			u_amount: ['amount', 0.015],
			u_twist: ['twist', 1],
		}
	);
});

t.draw(() => {
	const time = t.frameCount * 0.02;
	const radius = Math.min(t.grid.cols, t.grid.rows) * 0.34;

	t.background(8, 10, 20);
	t.lineWeight(2);

	for (let i = 0; i < 24; i++) {
		const angle = (i / 24) * Math.PI * 2 + time;
		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle * 1.5) * radius * 0.55;

		t.charColor(90 + i * 5, 140 + i * 3, 255);
		t.char(['·', '+', '*', '░'][i % 4]);
		t.line(-x, -y, x, y);
	}

	t.layers.base.filter('spectralPulse', { time, amount: 0.01, twist: 1.2 });
});

prismLayer.draw(() => {
	t.clear();

	const time = t.frameCount * 0.02;
	const count = 18;
	const radius = Math.min(t.grid.cols, t.grid.rows) * 0.2;

	for (let i = 0; i < count; i++) {
		const angle = (i / count) * Math.PI * 2 - time * 1.8;

		t.push();
		t.translate(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.65);
		t.rotateZ(angle * 60 + time * 180);
		t.char(['@', '#', '▓', '▒'][i % 4]);
		t.charColor(255, 180 + 60 * Math.sin(time + i), 80 + i * 8);
		t.arc(6 + i * 0.8, 3 + i * 0.35, time * 120 + i * 20, time * 120 + i * 20 + 180);
		t.pop();
	}

	prismLayer.filter('spectralPulse', { time: time * 1.4, amount: 0.02, twist: 2.5 });
	prismLayer.filter('grayscale', 0.15 + 0.15 * Math.sin(time * 3));
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
