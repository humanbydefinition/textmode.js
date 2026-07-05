/**
 * @title Textmodifier.background4
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const colorA = t.color(32, 12, 20);
const colorB = t.color(10, 24, 48);
let useA = true;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	useA = Math.floor(t.frameCount / 90) % 2 === 0;
	t.background(useA ? colorA : colorB);
	t.char(useA ? 'A' : 'B');
	t.charColor(255, 230, 140);
	t.rect(10, 5);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.BACKGROUND4', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: COLOR OBJECT', x, y++, 100, 220, 255);
	drawText('Reusable TextmodeColor values.', x, y++, 140, 160, 190);
	drawText('Background switches objects.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(useA ? 'ACTIVE: COLOR A' : 'ACTIVE: COLOR B', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
