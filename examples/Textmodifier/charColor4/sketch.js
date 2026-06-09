/**
 * @title Textmodifier.charColor4
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const colorA = t.color('#64ffd0');
const colorB = t.color('#ffc878');
let active = 'colorA';

t.draw(() => {
	t.background(6, 10, 22);
	const useA = Math.floor(t.frameCount / 45) % 2 === 0;
	active = useA ? 'colorA' : 'colorB';
	t.charColor(useA ? colorA : colorB);
	t.char('@');
	t.rotateZ(t.frameCount * 2);
	t.rect(10, 10);
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

	drawText('TEXTMODIFIER.CHARCOLOR4', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: COLOR OBJECT INPUT', x, y++, 100, 220, 255);
	drawText('Compact API demonstration.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`ACTIVE: ${active}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
