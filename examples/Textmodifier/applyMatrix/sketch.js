/**
 * @title Textmodifier.applyMatrix
 */
const t = textmode.create({
	pixelDensity: 1,
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
	const time = t.frameCount * 0.03;
	const c = Math.cos(time);
	const s = Math.sin(time);
	t.push();
	t.translate(8, 1);
	t.applyMatrix(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
	t.char('#');
	t.charColor(140, 220, 255);
	t.rect(12, 4);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.APPLYMATRIX', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CUSTOM MATRIX', x, y++, 100, 220, 255);
	drawText('Applies a 4x4 transform.', x, y++, 140, 160, 190);
	drawText('Matrix rotates the rectangle.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('API: t.applyMatrix(...)', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
