/**
 * @title Textmodifier.color2
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const goldLayer = t.layers.add();
const cyan = t.color(100, 220, 255);
const gold = t.color(255, 225, 140, 150);

t.draw(() => {
	t.background(6, 10, 22);
	t.charColor(cyan);
	t.char('o');
	t.translate(Math.cos(t.frameCount * 0.03) * 10, 0);
	t.ellipse(12, 10);
});

goldLayer.draw(() => {
	t.clear();
	t.charColor(gold);
	t.char('#');
	t.rect(12, 8);
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

	drawText('TEXTMODIFIER.COLOR2', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RGBA COLOR OBJECT', x, y++, 100, 220, 255);
	drawText('Compact API demonstration.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('RGBA ALPHA: 150', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
