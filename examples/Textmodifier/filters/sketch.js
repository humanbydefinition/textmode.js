/**
 * @title Textmodifier.filters
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const filters = [
	{ name: null, label: 'NO FILTER', params: undefined },
	{ name: 'invert', label: 'INVERT', params: undefined },
	{ name: 'grayscale', label: 'GRAYSCALE (0.5)', params: 0.5 },
	{ name: 'grayscale', label: 'GRAYSCALE (1.0)', params: 1.0 },
	{ name: 'sepia', label: 'SEPIA (0.5)', params: 0.5 },
	{ name: 'sepia', label: 'SEPIA (1.0)', params: 1.0 },
	{ name: 'threshold', label: 'THRESHOLD (0.3)', params: 0.3 },
	{ name: 'threshold', label: 'THRESHOLD (0.7)', params: 0.7 },
];

let filterOffset = 0;

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

	const time = t.frameCount * 0.03;
	const idx = Math.floor((t.frameCount + filterOffset) / 120) % filters.length;
	const filter = filters[idx];

	t.push();
	t.charColor(255, 180, 100);
	t.cellColor(30, 50, 120);
	t.char('@');
	t.rotateZ(time * 50);
	t.rect(14, 14);
	t.pop();

	for (let i = 0; i < 6; i++) {
		const angle = time + (i / 6) * Math.PI * 2;
		t.push();
		t.translate(Math.round(Math.cos(angle) * 7), Math.round(Math.sin(angle) * 7));
		t.charColor(100 + i * 25, 255, 150 + i * 15);
		t.char('*');
		t.point();
		t.pop();
	}

	drawCenteredText('Textmodifier.filters', -12, [240, 245, 255]);
	drawCenteredText('Post-processing effects on the final canvas.', -10, [150, 170, 200]);

	drawCenteredText(filter.label, -6, filter.name === null ? [255, 100, 100] : [140, 255, 180]);
	if (filter.name) {
		const paramsStr = filter.params !== undefined ? `, ${filter.params}` : '';
		drawCenteredText(`t.filter('${filter.name}'${paramsStr})`, -4, [140, 180, 255]);
	}

	if (filter.name) {
		t.filter(filter.name, filter.params);
	}

	drawCenteredText(
		`invert:${t.filters.has('invert')}  grayscale:${t.filters.has('grayscale')}  sepia:${t.filters.has('sepia')}  threshold:${t.filters.has('threshold')}`,
		11,
		[100, 120, 150]
	);
	drawCenteredText('click to advance', 13, [80, 90, 120]);
});

t.mouseClicked(() => {
	filterOffset += 120;
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
