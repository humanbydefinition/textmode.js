/**
 * @title TextmodeLayer.filter
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const effectLayer = t.layers.add();
const labelLayer = t.layers.add();

const filters = [
	{ name: 'invert', params: undefined, label: 'INVERT' },
	{ name: 'grayscale', params: 1.0, label: 'GRAYSCALE (1.0)' },
	{ name: 'sepia', params: 0.8, label: 'SEPIA (0.8)' },
	{ name: 'threshold', params: 0.5, label: 'THRESHOLD (0.5)' },
];

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();
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
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const filterIdx = Math.floor(t.frameCount / 120) % (filters.length + 1);
	const active = filterIdx < filters.length ? filters[filterIdx].label : 'NORMAL';

	drawText('TEXTMODELAYER.FILTER', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: LAYER POST FILTERS', x, y++, [100, 220, 255]);
	drawText('Only the effect layer changes.', x, y++, [140, 160, 190]);
	drawText('Base grid remains unfiltered.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`ACTIVE: ${active}`, x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
