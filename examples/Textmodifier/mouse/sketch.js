/**
 * @title Textmodifier.mouse
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let mx = 0;
let my = 0;
let inside = false;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	mx = t.mouse.x;
	my = t.mouse.y;
	inside = mx !== Number.NEGATIVE_INFINITY;
	t.charColor(50, 60, 90);
	t.char('.');
	t.line(-18, 0, 18, 0);
	t.line(0, -10, 0, 10);
	if (inside) {
		t.push();
		t.translate(mx, my);
		t.char('+');
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
	drawText('TEXTMODIFIER.MOUSE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: POINTER POSITION', x, y++, 100, 220, 255);
	drawText('Reads current mouse cell position.', x, y++, 140, 160, 190);
	drawText('Outside canvas returns infinity.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(inside ? 'INSIDE: TRUE' : 'INSIDE: FALSE', x, y++, 140, 255, 180);
	drawText(`X: ${mx}`, x, y++, 180, 200, 220);
	drawText(`Y: ${my}`, x, y++, 180, 200, 220);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
