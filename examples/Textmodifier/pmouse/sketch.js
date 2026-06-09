/**
 * @title Textmodifier.pmouse
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let px = 0;
let py = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	px = t.pmouse.x;
	py = t.pmouse.y;
	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		t.charColor(60, 80, 120);
		t.char('.');
		t.line(px, py, t.mouse.x, t.mouse.y);
		t.push();
		t.translate(t.mouse.x, t.mouse.y);
		t.char('@');
		t.charColor(255, 210, 120);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.PMOUSE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PREVIOUS MOUSE', x, y++, 100, 220, 255);
	drawText('Draws a trail from last point.', x, y++, 140, 160, 190);
	drawText('Updates whenever pointer moves.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`PX: ${px}`, x, y++, 180, 200, 220);
	drawText(`PY: ${py}`, x, y++, 180, 200, 220);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
