/**
 * @title Textmodifier.loading
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	loadingScreen: { transitionDuration: 300 },
});

const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.setup(async () => {
	t.loading.draw((ctx) => {
		const tm = ctx.textmodifier;
		tm.background(8, 10, 18);
		tm.char('#');
		tm.charColor(100, 220, 255);
		tm.rect(16, 4);
	});
	await new Promise((resolve) => setTimeout(resolve, 400));
});

t.draw(() => {
	t.background(6, 10, 22);
	t.char('@');
	t.charColor(140, 255, 180);
	t.rect(12, 5);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.LOADING', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LOADING SCREEN', x, y++, 100, 220, 255);
	drawText('Custom loading draw callback.', x, y++, 140, 160, 190);
	drawText('Setup waits briefly.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('STATUS: READY', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
