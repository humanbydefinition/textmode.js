/**
 * @title Textmodifier.lastKeyReleased
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
	const key = t.lastKeyReleased || '?';
	t.char(key[0] || '?');
	t.charColor(140, 220, 255);
	t.rect(8, 4);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.LASTKEYRELEASED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LAST KEY UP', x, y++, 100, 220, 255);
	drawText('Stores latest released key.', x, y++, 140, 160, 190);
	drawText('Value persists until next up.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('LAST: ' + String(t.lastKeyReleased || 'NONE').slice(0, 20), x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
