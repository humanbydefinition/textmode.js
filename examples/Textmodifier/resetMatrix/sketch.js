/**
 * @title Textmodifier.resetMatrix
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
	const time = t.frameCount * 0.04;
	t.push();
	t.rotateZ(time * 40);
	t.translate(12, 0);
	t.charColor(120, 220, 255);
	t.char('#');
	t.rect(6, 3);
	t.resetMatrix();
	t.charColor(255, 210, 120);
	t.translate(8, 3);
	t.char('+');
	t.rect(5, 1);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.RESETMATRIX', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CLEAR TRANSFORM', x, y++, 100, 220, 255);
	drawText('resetMatrix drops transforms.', x, y++, 140, 160, 190);
	drawText('Yellow bar uses fresh matrix.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('API: t.resetMatrix()', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
