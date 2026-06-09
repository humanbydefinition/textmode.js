/**
 * @title Textmodifier.isRenderingFrame
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let outsideFrame = false;
setInterval(() => {
	outsideFrame = t.isRenderingFrame;
}, 120);

t.draw(() => {
	t.background(6, 10, 22);
	t.char(t.isRenderingFrame ? '1' : '0');
	t.charColor(120, 220, 255);
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

	drawText('TEXTMODIFIER.ISRENDERINGFRAME', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: FRAME GUARD FLAG', x, y++, 100, 220, 255);
	drawText('Compact API demonstration.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const inside = t.isRenderingFrame ? 'TRUE' : 'FALSE';
	const outside = outsideFrame ? 'TRUE' : 'FALSE';
	drawText(`INSIDE: ${inside}`, x, y++, 140, 255, 180);
	drawText(`OUTSIDE: ${outside}`, x, y++, 180, 200, 220);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
