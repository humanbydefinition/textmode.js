/**
 * @title Textmodifier.background
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let r = 0;
let g = 0;
let b = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.03;
	r = Math.round(40 + 30 * Math.sin(time));
	g = Math.round(30 + 30 * Math.sin(time + 2));
	b = Math.round(60 + 40 * Math.sin(time + 4));
	t.background(r, g, b);
	t.char('#');
	t.charColor(240, 245, 255);
	t.rect(12, 5);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.BACKGROUND', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CANVAS COLOR', x, y++, 100, 220, 255);
	drawText('Sets and reads scene backdrop.', x, y++, 140, 160, 190);
	drawText('RGB values animate softly.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RGB: ${r},${g},${b}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
