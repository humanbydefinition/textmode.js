/**
 * @title TextmodeSource.brightnessRange
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const ranges = [
	{
		label: '0-84',
		start: 0,
		end: 84,
		characters: ' .:-',
		charColor: '#38bdf8',
	},
	{
		label: '85-170',
		start: 85,
		end: 170,
		characters: '=+*#',
		charColor: '#facc15',
	},
	{
		label: '171-255',
		start: 171,
		end: 255,
		characters: '%@',
		charColor: '#f8fafc',
	},
];

let rangeSources = [];

function drawText(text, x, y, color = [235, 240, 255]) {
	t.push();
	t.translate(x - Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);
	t.cellColor(0, 0, 0);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

function drawRangeSource(source, x, y, width, height, label, color) {
	t.push();
	t.translate(x, y);
	t.image(source, width, height);
	t.pop();

	drawText(label, x, y + Math.floor(height * 0.5) + 3, color);
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

	drawText('TextmodeSource.brightnessRange()', 0, -Math.floor(t.grid.rows * 0.5) + 2, [255, 225, 120]);

	for (let i = 0; i < rangeSources.length; i++) {
		const range = ranges[i];
		const x = startX + i * (panelWidth + gap);
		const color = i === 0 ? [56, 189, 248] : i === 1 ? [250, 204, 21] : [248, 250, 252];
		drawRangeSource(rangeSources[i], x, y, panelWidth, panelHeight, range.label, color);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
