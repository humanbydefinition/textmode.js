/**
 * @title TextmodeGrid.cols
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 22);

	const cols = t.grid.cols;
	const halfWidth = Math.floor(cols / 2);

	t.push();
	t.translate(0, 0);
	t.char('=');
	t.charColor(100, 160, 255, 120);
	t.rect(cols, 1);
	t.pop();

	t.push();
	t.charColor(255, 255, 255);
	t.translate(-halfWidth, 0);
	t.char('<');
	t.point();
	t.translate(cols - 1, 0);
	t.char('>');
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

	drawText('TEXTMODEGRID.COLS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: COLUMN COUNT READOUT', x, y++, 100, 220, 255);
	drawText('Number of character columns in grid.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`GRID COLUMNS: ${t.grid.cols} cells`, x, y++, 100, 160, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
