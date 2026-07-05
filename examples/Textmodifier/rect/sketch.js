/**
 * @title Textmodifier.rect
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let widthCells = 0;
let heightCells = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	const time = t.frameCount * 0.03;
	widthCells = 12 + Math.round(Math.sin(time) * 5);
	heightCells = 6 + Math.round(Math.cos(time * 0.8) * 3);
	t.push();
	t.translate(8, 1);
	t.rotateZ(Math.sin(time) * 8);
	t.char('#');
	t.charColor(120, 220, 255);
	t.cellColor(20, 30, 60);
	t.rect(widthCells, heightCells);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.RECT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RECTANGLE SHAPE', x, y++, 100, 220, 255);
	drawText('Draws width by height cells.', x, y++, 140, 160, 190);
	drawText('Scene shifted clear of the HUD.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`W: ${widthCells}`, x, y++, 140, 255, 180);
	drawText(`H: ${heightCells}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
