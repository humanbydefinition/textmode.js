/**
 * @title TextmodeColor.creation
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 22);
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const col1 = t.color(255, 120, 80);
	const col2 = t.color('#80FFB0');
	const col3 = t.color(180);

	drawText('TEXTMODECOLOR.CREATION', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: STATIC COLOR CREATOR', x, y++, 100, 220, 255);
	drawText('Supports RGB, Hex strings, Grays.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('RGB : 255, 120, 80', x, y++, col1.r, col1.g, col1.b);
	drawText('Hex : #80FFB0', x, y++, col2.r, col2.g, col2.b);
	drawText('Gray: 180', x, y++, col3.r, col3.g, col3.b);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
