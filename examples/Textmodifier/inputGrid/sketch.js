/**
 * @title Textmodifier.inputGrid
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const inputLayer = t.layers.add();
let locked = false;
let mode = 'topmost';

t.setup(() => {
	inputLayer.grid.cols = 24;
	inputLayer.grid.rows = 12;
});

t.mouseClicked(() => {
	locked = !locked;
	t.inputGrid(locked ? inputLayer.grid : 'topmost');
	mode = locked ? 'locked' : 'topmost';
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	t.charColor(60, 80, 120);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
});

inputLayer.draw(() => {
	t.clear();
	t.charColor(100, 220, 255);
	t.char('+');
	t.rect(inputLayer.grid.cols, inputLayer.grid.rows);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.INPUTGRID', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: INPUT GRID LOCK', x, y++, 100, 220, 255);
	drawText('Mouse mapping can lock.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${mode}`, x, y++, 140, 255, 180);
	drawText('CLICK TO TOGGLE', x, y++, 255, 225, 140);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
