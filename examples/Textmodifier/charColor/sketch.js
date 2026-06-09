/**
 * @title Textmodifier.charColor
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let current = t.color(255, 255, 255);

t.draw(() => {
	t.background(6, 10, 22);
	const r = Math.round(150 + 105 * Math.sin(t.frameCount * 0.04));
	const g = Math.round(150 + 105 * Math.cos(t.frameCount * 0.03));
	t.charColor(r, g, 180);
	current = t.charColor();
	t.char('#');
	t.rect(14, 6);
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

	drawText('TEXTMODIFIER.CHARCOLOR', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CHARACTER COLOR', x, y++, 100, 220, 255);
	drawText('Compact API demonstration.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const rgb = current.r + ',' + current.g + ',' + current.b;
	drawText(`RGB: ${rgb}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
