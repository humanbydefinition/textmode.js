/**
 * @title TextmodeLayer.blendMode
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

// Create 5 layers with different blend modes
const blendModes = ['additive', 'screen', 'overlay', 'difference', 'multiply'];
const colors = [
	[255, 80, 150],
	[80, 180, 255],
	[255, 200, 80],
	[150, 255, 120],
	[200, 120, 255],
];
const layers = blendModes.map((mode) => t.layers.add({ blendMode: mode, opacity: 0.85 }));

t.draw(() => {
	const time = t.frameCount * 0.2;
	t.background(12, 8, 20, 255);

	layers.forEach((layer, i) => {
		layer.draw(() => {
			t.charColor(...colors[i], 255);

			// Draw spiral of characters
			for (let j = 0; j < 30; j++) {
				const angle = j * 0.2 + time * (i % 2 ? 1 : -1);
				const radius = 3 + j * 0.4 + Math.sin(time + j) * 2;
				const x = Math.cos(angle) * radius;
				const y = Math.sin(angle) * radius * 0.6;

				t.char('#*+=-.'[j % 6]);
				t.translate(Math.round(x), Math.round(y));
				t.rect(1, 1);
			}
		});

		// Offset each layer
		layer.offset(Math.sin(time * 0.6 + i) * 6, Math.cos(time * 0.3 + i) * 4);
	});
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
