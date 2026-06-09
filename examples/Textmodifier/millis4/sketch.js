/**
 * @title Textmodifier.millis4
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let value = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	value = Math.sin(t.millis * 0.002);
	const angle = (value % 6.28) * 1;
	t.push();
	t.translate(8, 2);
	t.rotateZ((angle * 180) / Math.PI);
	t.char('#');
	t.charColor(140, 220, 255);
	t.rect(12, 1);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MILLIS4', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SMOOTH OSCILLATOR', x, y++, 100, 220, 255);
	drawText('Numeric time drives motion.', x, y++, 140, 160, 190);
	drawText('Rows stay fixed-width short.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`VALUE: ${value.toFixed(2)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
