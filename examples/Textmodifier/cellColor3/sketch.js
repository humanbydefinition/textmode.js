/**
 * @title Textmodifier.cellColor3
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let value = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	value = Math.round(80 + 80 * Math.sin(t.frameCount * 0.04));
	t.char('#');
	t.cellColor(value > 80 ? '#14385f' : '#301820');
	t.charColor(240, 245, 255);
	t.rect(10, 5);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CELLCOLOR3', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: HEX CELL BACKGROUND', x, y++, 100, 220, 255);
	drawText('Hex strings set cellColor.', x, y++, 140, 160, 190);
	drawText('The value pulses every frame.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(value > 80 ? 'HEX: BLUE' : 'HEX: RED', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
