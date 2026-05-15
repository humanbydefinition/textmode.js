/**
 * @title Textmodifier.filter
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

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

	const time = t.frameCount * 0.02;
	const count = 12;

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();

	for (let i = 0; i < count; i++) {
		const angle = (i / count) * Math.PI * 2 + time;
		const radius = 10 + 5 * Math.sin(time * 3 + i);

		t.push();
		t.translate(Math.round(Math.cos(angle) * radius * 1.5), Math.round(Math.sin(angle) * radius));
		t.rotateZ(angle * 50);
		t.charColor(100 + i * 20, 255 - i * 10, 150 + i * 10);
		t.char(['@', '%', '#', '*'][i % 4]);
		t.rect(8, 4);
		t.pop();
	}

	const filterIdx = Math.floor(t.frameCount / 120) % (filters.length + 1);

	if (filterIdx < filters.length) {
		const active = filters[filterIdx];
		t.filter(active.name, active.params);
	}
});

labelLayer.draw(() => {
	t.clear();

	drawCenteredText('Textmodifier.filter', -12, [240, 245, 255]);
	drawCenteredText('Applying post-processing to the canvas output.', -10, [150, 170, 200]);

	const filterIdx = Math.floor(t.frameCount / 120) % (filters.length + 1);

	if (filterIdx < filters.length) {
		const active = filters[filterIdx];
		drawCenteredText('ACTIVE FILTER: ' + active.label, 10, [140, 255, 180]);
	} else {
		drawCenteredText('NO FILTER (NORMAL)', 10, [255, 100, 100]);
	}

	drawCenteredText('t.filter(name, params)', 13, [100, 120, 150]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
