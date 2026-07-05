/**
 * @title Textmodifier.pinch
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let scale = 1;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.pinch((data) => {
	scale = Math.max(0.3, Math.min(4, data.scale));
});

t.mouseScrolled((data) => {
	scale = Math.max(0.3, Math.min(4, scale - data.delta.y * 0.01));
});

t.draw(() => {
	t.background(6, 10, 22);
	t.push();
	t.rotateZ(t.frameCount * 0.5);
	t.char('#');
	t.charColor(140, 220, 255);
	t.rect(8 * scale, 8 * scale);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.PINCH', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PINCH SCALE', x, y++, 100, 220, 255);
	drawText('Pinch or scroll changes scale.', x, y++, 140, 160, 190);
	drawText('Shape size follows gesture.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SCALE: ${scale.toFixed(2)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
