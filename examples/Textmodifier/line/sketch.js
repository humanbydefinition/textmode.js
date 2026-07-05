/**
 * @title Textmodifier.line
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let a = 0;
let b = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	const time = t.frameCount * 0.025;
	a = Math.sin(time) * 10;
	b = Math.cos(time * 0.7) * 7;
	t.charColor(60, 70, 100);
	t.char('.');
	t.line(-18, 0, 18, 0);
	t.line(0, -10, 0, 10);
	t.charColor(120, 220, 255);
	t.char('#');
	t.line(-18, -b, 18, b);
	t.charColor(255, 210, 120);
	t.line(-a, -10, a, 10);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.LINE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DRAW SEGMENTS', x, y++, 100, 220, 255);
	drawText('Connects two grid coordinates.', x, y++, 140, 160, 190);
	drawText('Animated endpoints cross center.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`A: ${a.toFixed(1)}`, x, y++, 140, 255, 180);
	drawText(`B: ${b.toFixed(1)}`, x, y++, 255, 210, 120);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
