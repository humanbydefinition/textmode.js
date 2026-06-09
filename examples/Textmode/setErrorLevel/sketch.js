/**
 * @title Textmode.setErrorLevel
 */
const levels = [
	{ name: 'SILENT', value: TextmodeErrorLevel.SILENT, summary: 'no output' },
	{ name: 'WARNING', value: TextmodeErrorLevel.WARNING, summary: 'console.warn()' },
	{ name: 'ERROR', value: TextmodeErrorLevel.ERROR, summary: 'console.error()' },
	{ name: 'THROW', value: TextmodeErrorLevel.THROW, summary: 'throws' },
];

let activeIndex = 1;
textmode.setErrorLevel(levels[activeIndex].value);

const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	const cycle = 180;
	const idx = Math.floor(t.frameCount / cycle) % levels.length;

	if (idx !== activeIndex) {
		activeIndex = idx;
		textmode.setErrorLevel(levels[activeIndex].value);
	}

	t.background(18, 20, 28);
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

	const level = levels[activeIndex];
	const meter = levels.map((_, i) => (i <= activeIndex ? '|' : '.')).join('');

	drawText('TEXTMODE.SETERRORLEVEL', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: GLOBAL ERROR HANDLING', x, y++, 100, 220, 255);
	drawText('Sets library diagnostic severity.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`ACTIVE LEVEL: ${level.name}`, x, y++, 255, 210, 90);
	drawText(`LEVEL METER : ${meter}`, x, y++, 255, 210, 90);
	drawText(`BEHAVIOR    : ${level.summary}`, x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
