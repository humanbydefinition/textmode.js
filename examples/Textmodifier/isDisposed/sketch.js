/**
 * @title Textmodifier.isDisposed
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.mouseClicked(() => {
	if (!t.isDisposed) t.destroy();
});

t.draw(() => {
	t.background(6, 10, 22);
	t.char(t.isDisposed ? 'X' : '#');
	t.charColor(t.isDisposed ? 255 : 140, t.isDisposed ? 120 : 220, 180);
	t.rect(12, 5);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ISDISPOSED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DISPOSED FLAG', x, y++, 100, 220, 255);
	drawText('Click calls destroy().', x, y++, 140, 160, 190);
	drawText('Flag reports lifecycle state.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(t.isDisposed ? 'DISPOSED: YES' : 'DISPOSED: NO', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
