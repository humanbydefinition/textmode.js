/**
 * @title Textmodifier.mouseScrolled
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let scale = 8;
let delta = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.mouseScrolled((data) => {
	delta = data.delta.y;
	scale = Math.max(3, Math.min(18, scale - delta * 0.1));
});

t.draw(() => {
	t.background(6, 10, 22);
	t.char('#');
	t.charColor(140, 220, 255);
	t.ellipse(scale, scale * 0.6);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MOUSESCROLLED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SCROLL DELTA', x, y++, 100, 220, 255);
	drawText('Wheel or touchpad changes scale.', x, y++, 140, 160, 190);
	drawText('Delta sign is kept visible.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SCALE: ${scale.toFixed(1)}`, x, y++, 140, 255, 180);
	drawText(`DELTA: ${delta.toFixed(1)}`, x, y++, 180, 200, 220);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
