/**
 * @title TextmodeLayer.blendMode
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const blendModes = ['additive', 'screen', 'overlay', 'difference', 'multiply'];
const colors = [
	[255, 80, 150],
	[80, 180, 255],
	[255, 200, 80],
	[150, 255, 120],
	[200, 120, 255],
];

const layers = blendModes.map((mode) => t.layers.add({ blendMode: mode, opacity: 0.9 }));

function drawLabel(text, x, y, col = [255, 255, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(...col);
	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.02;
	t.background(10, 15, 25);

	const { cols, rows } = t.grid;

	t.char('+');
	t.charColor(40, 50, 80);
	t.rect(cols, rows);

	layers.forEach((layer, i) => {
		layer.draw(() => {
			t.clear();
			t.push();

			const angle = (i / layers.length) * Math.PI * 2 + time;
			const radius = 8 + Math.sin(time * 2) * 2;
			t.translate(Math.cos(angle) * radius, Math.sin(angle) * radius);

			t.charColor(...colors[i]);
			t.char('@');
			t.rect(14, 8);

			drawLabel(blendModes[i], -(blendModes[i].length - 1) / 2, 0, [255, 255, 255]);

			t.pop();
		});
	});

	const title = '--- BLEND MODES ---';
	drawLabel(title, -(title.length - 1) / 2, -(rows - 1) / 2 + 2, [255, 220, 100]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
