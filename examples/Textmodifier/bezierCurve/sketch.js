/**
 * @title Textmodifier.bezierCurve
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
	const time = t.frameCount * 0.025;
	const cp1x = -8 + Math.sin(time) * 6;
	const cp1y = -7;
	const cp2x = 8 + Math.cos(time * 0.8) * 6;
	const cp2y = 7;
	t.push();
	t.translate(7, 1);
	t.charColor(60, 70, 100);
	t.char('.');
	t.line(-14, 0, cp1x, cp1y);
	t.line(14, 0, cp2x, cp2y);
	t.char('#');
	t.charColor(140, 220, 255);
	t.bezierCurve(-14, 0, cp1x, cp1y, cp2x, cp2y, 14, 0);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.BEZIERCURVE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CUBIC CURVE', x, y++, 100, 220, 255);
	drawText('Two control points bend path.', x, y++, 140, 160, 190);
	drawText('Guide lines show handles.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('API: t.bezierCurve(...)', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
