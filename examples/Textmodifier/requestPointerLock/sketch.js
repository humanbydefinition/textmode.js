/**
 * @title Textmodifier.requestPointerLock
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let cx = 0;
let cy = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.mouseClicked(() => {
	if (document.pointerLockElement === t.canvas) t.exitPointerLock();
	else t.requestPointerLock();
});

t.draw(() => {
	t.background(6, 10, 22);
	const locked = document.pointerLockElement === t.canvas;
	if (locked) {
		cx += t.movedX * 0.08;
		cy += t.movedY * 0.08;
	}
	cx = Math.max(-20, Math.min(20, cx));
	cy = Math.max(-10, Math.min(10, cy));
	t.push();
	t.translate(cx, cy);
	t.char(locked ? '@' : '+');
	t.charColor(locked ? 140 : 255, locked ? 255 : 210, 180);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.REQUESTPOINTERLOCK', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LOCK POINTER', x, y++, 100, 220, 255);
	drawText('Click toggles pointer lock.', x, y++, 140, 160, 190);
	drawText('Movement uses movedX/movedY.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(document.pointerLockElement === t.canvas ? 'LOCKED: TRUE' : 'LOCKED: FALSE', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
