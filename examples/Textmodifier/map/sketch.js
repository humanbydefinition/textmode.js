/**
 * @title Textmodifier.map
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let mappedHeight = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 17);
	const halfCols = Math.max(1, Math.floor(t.grid.cols / 2));
	const halfRows = Math.max(1, Math.floor(t.grid.rows / 2));
	const pointer = t.constrain(t.mouse.x, -halfCols, halfCols);
	mappedHeight = t.map(pointer, -halfCols, halfCols, 1, 13);

	for (let i = 0; i < 17; i++) {
		const x = -16 + i * 2;
		const wave = Math.sin(t.frameCount * 0.04 + i * 0.55);
		const height = Math.round(t.map(wave, -1, 1, 1, mappedHeight));
		const red = Math.round(t.map(i, 0, 16, 80, 255));
		const blue = Math.round(t.map(height, 1, 13, 255, 90));

		t.char(i % 3 === 0 ? '#' : '|');
		t.charColor(red, 190, blue);
		t.push();
		t.translate(x, 7 - height / 2);
		t.rect(1, height);
		t.pop();
	}

	const y = t.map(t.mouse.y, -halfRows, halfRows, -7, 7);
	t.char('-');
	t.charColor(255, 230, 120);
	t.line(-18, y, 18, y);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MAP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RANGE REMAPPING', x, y++, 100, 220, 255);
	drawText('Mouse grid values become bar ranges.', x, y++, 140, 160, 190);
	drawText('map() also colors each column.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`HEIGHT: ${mappedHeight.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
