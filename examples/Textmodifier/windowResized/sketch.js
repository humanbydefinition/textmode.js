/**
 * @title Textmodifier.windowResized
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let resizes = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

window.addEventListener('resize', () => {
	resizes++;
});

t.draw(() => {
	t.background(6, 10, 22);
	t.char('#');
	t.charColor(140, 220, 255);
	t.rect(12, 5);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.WINDOWRESIZED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RESIZE CALLBACK', x, y++, 100, 220, 255);
	drawText('windowResized keeps canvas fit.', x, y++, 140, 160, 190);
	drawText('Browser resize updates count.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RESIZES: ${resizes}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
