/**
 * @title Textmodifier.grid
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

t.draw(() => {
	t.background(6, 10, 22);
	t.charColor(50, 70, 100);
	t.char('.');
	for (let x = -20; x <= 20; x += 4) t.line(x, -10, x, 10);
	for (let y = -10; y <= 10; y += 2) t.line(-20, y, 20, y);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.GRID', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: GRID METRICS', x, y++, 100, 220, 255);
	drawText('Exposes rows, cols, and cells.', x, y++, 140, 160, 190);
	drawText('Grid changes with window size.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`COLS: ${t.grid.cols}`, x, y++, 140, 255, 180);
	drawText(`ROWS: ${t.grid.rows}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
