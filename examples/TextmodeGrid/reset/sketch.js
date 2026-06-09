/**
 * @title TextmodeGrid.reset
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let gridStatus = 'CUSTOM (26x12)';

t.setup(() => {
	t.grid.cols = 26;
	t.grid.rows = 12;
});

t.draw(() => {
	t.background(6, 10, 22);

	t.push();
	t.char('+');
	t.charColor(100, 255, 150);
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();
});

t.mouseClicked(() => {
	if (t.grid.cols === 26 && t.grid.rows === 12) {
		t.grid.responsive();
		t.grid.reset();
		gridStatus = 'RESET TO VIEWPORT';
	} else {
		t.grid.cols = 26;
		t.grid.rows = 12;
		gridStatus = 'CUSTOM (26x12)';
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

	drawText('TEXTMODEGRID.RESET', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RESET GRID TO FIT VIEWPORT', x, y++, 100, 220, 255);
	drawText('Resets grid size to viewport.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`GRID STATUS: ${gridStatus}`, x, y++, 140, 190, 255);
	const dims = t.grid.cols + 'x' + t.grid.rows;
	drawText(`DIMS: ${dims}`, x, y++, 140, 190, 255);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('Click to toggle custom grid size.', x, y++, 120, 205, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
