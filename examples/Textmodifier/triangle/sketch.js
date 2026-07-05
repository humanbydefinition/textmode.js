/**
 * @title Textmodifier.triangle
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
	const time = t.frameCount * 0.03;
	t.push();
	t.translate(8, 2);
	t.rotateZ(Math.sin(time) * 18);
	t.char('^');
	t.charColor(255, 210, 120);
	t.cellColor(30, 20, 10);
	t.triangle(-9, 6, 0, -7, 9, 6);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.TRIANGLE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: THREE POINT SHAPE', x, y++, 100, 220, 255);
	drawText('Uses three explicit vertices.', x, y++, 140, 160, 190);
	drawText('Rotation shows the filled area.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('API: t.triangle(...)', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
