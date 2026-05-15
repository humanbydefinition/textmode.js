/**
 * @title TextmodeLayer.filter
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const effectLayer = t.layers.add();

const filters = [
	{ name: 'invert', params: undefined, label: 'INVERT' },
	{ name: 'grayscale', params: 1.0, label: 'GRAYSCALE (1.0)' },
	{ name: 'sepia', params: 0.8, label: 'SEPIA (0.8)' },
	{ name: 'threshold', params: 0.5, label: 'THRESHOLD (0.5)' },
];

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

t.draw(() => {
	t.background(6, 10, 22);

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();

	drawCenteredText('TextmodeLayer.filter', -12, [240, 245, 255]);
	drawCenteredText('Applying post-processing to specific layers.', -10, [150, 170, 200]);
});

effectLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.02;

	for (let i = 0; i < 8; i++) {
		const angle = time + (i / 8) * Math.PI * 2;
		const r = 8 + Math.sin(time * 2) * 2;
		t.push();
		t.translate(Math.round(Math.cos(angle) * r * 1.5), Math.round(Math.sin(angle) * r * 0.6));
		t.charColor(100 + i * 20, 255 - i * 10, 150 + i * 10);
		t.char('#');
		t.point();
		t.pop();
	}

	const filterIdx = Math.floor(t.frameCount / 120) % (filters.length + 1);

	if (filterIdx < filters.length) {
		const active = filters[filterIdx];
		effectLayer.filter(active.name, active.params);

		drawCenteredText('ACTIVE FILTER: ' + active.label, 10, [140, 255, 180]);
	} else {
		drawCenteredText('NO FILTER (NORMAL)', 10, [255, 100, 100]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
