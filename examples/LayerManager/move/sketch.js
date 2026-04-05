/**
 * @title LayerManager.move
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

const specs = [
	{ char: '▒', color: [255, 120, 90], radius: 10, speed: 0.9 },
	{ char: '░', color: [110, 210, 255], radius: 14, speed: -0.7 },
	{ char: '+', color: [255, 235, 120], radius: 18, speed: 1.3 },
	{ char: '•', color: [160, 255, 170], radius: 22, speed: -1.1 },
];

const layers = specs.map((spec, index) => {
	const layer = t.layers.add({ blendMode: 'screen', opacity: 0.78 - index * 0.08 });

	layer.draw(() => {
		t.clear();

		const time = t.frameCount * 0.02;
		const count = 12 + index * 3;

		for (let i = 0; i < count; i++) {
			const angle = (i / count) * Math.PI * 2 + time * spec.speed;
			const wobble = spec.radius + Math.sin(time * 2 + i + index) * 2.5;

			t.push();
			t.translate(Math.cos(angle) * wobble, Math.sin(angle * 1.4) * wobble * 0.55);
			t.rotateZ(angle * 90);
			t.char(spec.char);
			t.charColor(...spec.color);
			t.rect(3 + index, 1 + (i % 3));
			t.pop();
		}
	});

	return layer;
});

t.draw(() => {
	const time = t.frameCount * 0.02;
	const step = Math.floor(t.frameCount / 75);

	t.background(8, 12, 24);

	for (let i = 0; i < 24; i++) {
		const angle = (i / 24) * Math.PI * 2 - time * 0.8;
		const radius = Math.min(t.grid.cols, t.grid.rows) * 0.42;

		t.charColor(30, 70, 110 + i * 4);
		t.char(i % 2 ? '.' : ':');
		t.line(0, 0, Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6);
	}

	if (t.frameCount % 75 === 0) {
		const layer = layers[step % layers.length];
		t.layers.move(layer, layers.length - 1);
	}

	t.charColor(255, 245, 180);
	t.char(String((step % layers.length) + 1));
	t.point();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
