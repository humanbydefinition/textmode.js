/**
 * @title TextmodeGrid.cellWidth
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 22);

	t.push();
	t.translate(0, 0);
	t.charColor(255, 180, 100);
	t.char('◄');
	t.rect(t.grid.cellWidth, 1);
	t.pop();
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

	drawText('TEXTMODEGRID.CELLWIDTH', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: INDIVIDUAL CELL PIXEL WIDTH', x, y++, 100, 220, 255);
	drawText('Width in pixels of a single cell.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`CELL PIXEL WIDTH: ${t.grid.cellWidth} px`, x, y++, 255, 180, 100);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
