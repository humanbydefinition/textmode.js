/**
 * @title TextmodeSource.brightnessRange
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const labelLayer = t.layers.add();
const ranges = [
	{ label: '0-84', start: 0, end: 84, characters: ' .:-', charColor: '#38bdf8' },
	{ label: '85-170', start: 85, end: 170, characters: '=+*#', charColor: '#facc15' },
	{ label: '171-255', start: 171, end: 255, characters: '%@', charColor: '#f8fafc' },
];

let rangeSources = [];

function drawRangeSource(source, x, y, width, height) {
	t.push();
	t.translate(x, y);
	t.image(source, width, height);
	t.pop();
}

t.setup(async () => {
	rangeSources = await Promise.all(
		ranges.map(async (range) => {
			const source = await t.loadImage(IMAGE_URL);
			source.brightnessRange(range.start, range.end);
			source.characters(range.characters);
			source.charColorMode('fixed');
			source.charColor(range.charColor);
			source.cellColorMode('fixed');
			source.cellColor('#00000000');
			return source;
		})
	);
});

t.draw(() => {
	t.background(4, 7, 18);
	if (rangeSources.length === 0) return;

	const gap = Math.max(4, Math.floor(t.grid.cols * 0.035));
	const panelWidth = Math.max(12, Math.floor((t.grid.cols - gap * 4) / 3));
	const panelHeight = Math.max(10, Math.min(t.grid.rows - 12, Math.floor(panelWidth * 0.72)));
	const totalWidth = panelWidth * 3 + gap * 2;
	const startX = -Math.floor(totalWidth * 0.5) + Math.floor(panelWidth * 0.5);
	const y = -1;

	for (let i = 0; i < rangeSources.length; i++) {
		const x = startX + i * (panelWidth + gap);
		drawRangeSource(rangeSources[i], x, y, panelWidth, panelHeight);
	}
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODESOURCE.BRIGHTNESSRANGE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SUB-BRIGHTNESS CONVERSIONS', x, y++, 100, 220, 255);
	drawText('Filters characters by brightness range.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('Left  : 0-84   (Shadows)', x, y++, 56, 189, 248);
	drawText('Mid   : 85-170 (Midtones)', x, y++, 250, 204, 21);
	drawText('Right : 171-255(Highlights)', x, y++, 248, 250, 252);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
