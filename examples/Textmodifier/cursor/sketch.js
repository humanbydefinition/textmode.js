/**
 * @title Textmodifier.cursor
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let hovering = false;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	hovering = Math.abs(t.mouse.x) < 8 && Math.abs(t.mouse.y) < 5;
	t.cursor(hovering ? 'pointer' : 'default');
	t.char(hovering ? '@' : '+');
	t.charColor(hovering ? 255 : 120, hovering ? 210 : 180, 120);
	t.rect(16, 10);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CURSOR', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SYSTEM CURSOR', x, y++, 100, 220, 255);
	drawText('Hover center box for pointer.', x, y++, 140, 160, 190);
	drawText('Cursor changes with state.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(hovering ? 'CURSOR: POINTER' : 'CURSOR: DEFAULT', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
