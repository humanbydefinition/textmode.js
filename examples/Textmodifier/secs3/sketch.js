/**
 * @title Textmodifier.secs3
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let scrub = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.mouseDragged(() => {
	scrub = t.mouse.x === Number.NEGATIVE_INFINITY ? scrub : t.mouse.x / 10;
});

t.draw(() => {
	t.background(6, 10, 22);
	const value = t.mouseIsPressed ? scrub : t.secs;
	t.push();
	t.translate(8, 2);
	t.rotateZ(value * 40);
	t.char('#');
	t.charColor(140, 220, 255);
	t.rect(10, 2);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.SECS3', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SCRUB TIME', x, y++, 100, 220, 255);
	drawText('Drag to scrub temporary time.', x, y++, 140, 160, 190);
	drawText('Release to resume t.secs.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SECS: ${t.secs.toFixed(2)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
