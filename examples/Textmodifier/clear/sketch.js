/**
 * @title Textmodifier.clear
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let clearEnabled = true;

t.mouseClicked(() => {
	clearEnabled = !clearEnabled;
	if (clearEnabled) t.clear();
});

t.draw(() => {
	if (clearEnabled) t.clear();
	const time = t.frameCount * 0.05;
	t.push();
	t.translate(Math.cos(time) * 15, Math.sin(time) * 6);
	t.charColor(255, 225, 140);
	t.char('#');
	t.rect(4, 2);
	t.pop();
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

	drawText('TEXTMODIFIER.CLEAR', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CLEAR LAYER BUFFER', x, y++, 100, 220, 255);
	drawText('Compact API demonstration.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const state = clearEnabled ? 'ON' : 'OFF';
	drawText(`CLEAR: ${state}`, x, y++, 140, 255, 180);
	drawText('CLICK TO TOGGLE', x, y++, 255, 225, 140);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
