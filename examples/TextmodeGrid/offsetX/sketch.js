/**
 * @title TextmodeGrid.offsetX
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
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const left = -Math.floor(cols / 2);
	const top = -Math.floor(rows / 2);
	t.charColor(60, 80, 120);
	t.char('#');
	t.rect(cols, rows);
	t.push();
	t.translate(0, 1);
	t.charColor(100, 255, 180);
	drawText(`OFFSET X: ${t.grid.offsetX}px`, left + 4, 0, 100, 255, 180);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODEGRID.OFFSETX', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: HORIZONTAL OFFSET', x, y++, 100, 220, 255);
	drawText('Grid centers inside canvas.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`PIXELS: ${t.grid.offsetX}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
