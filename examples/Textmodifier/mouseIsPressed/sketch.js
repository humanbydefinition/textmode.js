/**
 * @title Textmodifier.mouseIsPressed
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let pressed = false;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	pressed = t.mouseIsPressed;
	if (pressed && t.mouse.x !== Number.NEGATIVE_INFINITY) {
		t.translate(t.mouse.x, t.mouse.y);
	}
	t.char(pressed ? '@' : '.');
	t.charColor(pressed ? 140 : 80, pressed ? 255 : 90, pressed ? 180 : 100);
	t.rect(8, 4);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MOUSEISPRESSED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: BUTTON STATE', x, y++, 100, 220, 255);
	drawText('True while mouse is held.', x, y++, 140, 160, 190);
	drawText('Shape follows held pointer.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(pressed ? 'PRESSED: TRUE' : 'PRESSED: FALSE', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
