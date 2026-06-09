/**
 * @title TextmodeGrid.height
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

	const rows = t.grid.rows;
	const halfHeight = Math.floor(rows / 2);

	t.push();
	t.translate(14, 0);
	t.char('|');
	t.charColor(140, 255, 180, 100);
	t.rect(1, rows);
	t.pop();

	t.push();
	t.charColor(255, 255, 255);
	t.translate(14, -halfHeight);
	t.char('▲');
	t.point();
	t.translate(0, rows - 1);
	t.char('▼');
	t.point();
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

	drawText('TEXTMODEGRID.HEIGHT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: TOTAL GRID PIXEL HEIGHT', x, y++, 100, 220, 255);
	drawText('Returns pixel height of grid.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`GRID PIXEL HEIGHT: ${t.grid.height} px`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
