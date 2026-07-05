/**
 * @title Textmodifier.draw
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let pulse = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	pulse = 0.5 + 0.5 * Math.sin(t.frameCount * 0.05);
	t.push();
	t.translate(8, 2);
	t.char('#');
	t.charColor(120, 120 + pulse * 120, 255);
	t.rect(6 + pulse * 8, 3 + pulse * 4);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.DRAW', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: FRAME CALLBACK', x, y++, 100, 220, 255);
	drawText('draw() runs every frame.', x, y++, 140, 160, 190);
	drawText('Pulse proves continuous updates.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`PULSE: ${pulse.toFixed(2)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
