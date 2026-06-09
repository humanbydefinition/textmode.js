/**
 * @title Textmodifier.keyPressed
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let last = 'NONE';
let count = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.keyPressed((data) => {
	last = data.key || 'UNKNOWN';
	count++;
});

t.draw(() => {
	t.background(6, 10, 22);
	t.char(last[0] || '?');
	t.charColor(255, 210, 120);
	t.rect(8, 4);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.KEYPRESSED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: KEY DOWN EVENT', x, y++, 100, 220, 255);
	drawText('Fires when a key is pressed.', x, y++, 140, 160, 190);
	drawText('Last key is shown in center.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`COUNT: ${count}`, x, y++, 140, 255, 180);
	drawText('LAST: ' + last.slice(0, 20), x, y++, 180, 200, 220);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
