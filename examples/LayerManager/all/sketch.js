/**
 * @title LayerManager.all
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

['screen', 'additive', 'overlay', 'difference'].forEach((blendMode, index) => {
	const layer = t.layers.add({ blendMode, opacity: 0.7 });

	layer.draw(() => {
		t.clear();

		const time = t.frameCount * 0.02;
		const ringCount = 10;
		const baseSize = Math.min(t.grid.cols, t.grid.rows) * (0.35 + index * 0.08);

		for (let i = 0; i < ringCount; i++) {
			const phase = i / ringCount;
			const size = baseSize * (0.4 + phase * 0.9 + 0.1 * Math.sin(time * 2 + index + i));
			const start = time * 90 + index * 45 + i * 28;
			const sweep = 35 + 90 * (0.5 + 0.5 * Math.sin(time * 1.5 + phase * Math.PI * 2 + index));

			t.push();
			t.rotateZ(start * (index % 2 ? -0.25 : 0.25));
			t.char(['·', '+', '*', '░', '▒'][(index * 2 + i) % 5]);
			t.lineWeight(1 + ((i + index) % 3));
			t.charColor(80 + 40 * i, 120 + 30 * index, 255 - 18 * i);
			t.arc(size, size * (0.6 + phase * 0.35), start, start + sweep);
			t.pop();
		}
	});
});

t.draw(() => {
	t.background(10, 15, 25);

	const time = t.frameCount * 0.02;
	const radius = Math.min(t.grid.cols, t.grid.rows) * 0.12;

	t.layers.all.forEach((layer, index) => {
		const angle = time * (0.8 + index * 0.15) + index * ((Math.PI * 2) / t.layers.all.length);

		layer.offset(Math.cos(angle) * radius, Math.sin(angle * 1.4) * radius * 0.6);
		layer.rotateZ(time * (40 - index * 10));
		layer.opacity(0.35 + index * 0.12 + 0.18 * Math.sin(time * 3 + index));
	});
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
