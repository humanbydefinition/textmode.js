/**
 * @title Textmodifier.rotateZ
 */
const t = textmode.create({
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
	const time = t.frameCount * 0.04;
	value = (time * 70) % 360;
	t.charColor(50, 60, 90);
	t.char('.');
	t.line(-18, 0, 18, 0);
	t.line(0, -10, 0, 10);
	t.push();
	t.rotateZ(value);
	t.char('#');
	t.charColor(140, 255, 180);
	t.rect(6, 4);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ROTATEZ', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: Z AXIS ROTATION', x, y++, 100, 220, 255);
	drawText('Roll matches 2D rotation.', x, y++, 140, 160, 190);
	drawText('Grid cross shows original axes.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`DEG: ${value.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
