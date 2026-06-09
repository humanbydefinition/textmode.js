/**
 * @title Textmodifier.invert
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(10, 12, 24);

	const count = 15;
	for (let i = 0; i < count; i++) {
		t.push();
		t.translate((i - (count - 1) / 2) * 5, 0);

		const shouldInvert = (i + Math.floor(t.frameCount / 25)) % 2 === 0;
		t.invert(shouldInvert);

		t.charColor(255, 100, 100);
		t.cellColor(0, 50, 100);
		t.char('█');
		t.rect(4, 18);
		t.pop();
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

	const invertActive = Math.floor(t.frameCount / 25) % 2 === 0;

	drawText('TEXTMODIFIER.INVERT', x, y++, 255, 100, 100);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CHROMA CHANNEL INVERSION', x, y++, 100, 220, 255);
	drawText('Swaps char and cell colors.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const state = invertActive ? 'INVERTED' : 'STANDARD';
	drawText(`INVERT: ${state}`, x, y++, 120, 205, 255);
	drawText('RECTS: 15', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('t.invert(shouldInvert)', x, y++, 100, 220, 140);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
