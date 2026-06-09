/**
 * @title Textmodifier.destroy
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let requested = false;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.mouseClicked(() => {
	requested = true;
});

t.draw(() => {
	t.background(12, 6, 8);
	t.char(requested ? '!' : '#');
	t.charColor(requested ? 255 : 140, requested ? 120 : 220, 120);
	t.rect(12, 5);
	if (requested && t.frameCount % 120 === 0) t.destroy();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.DESTROY', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DISPOSE INSTANCE', x, y++, 100, 220, 255);
	drawText('Click requests cleanup.', x, y++, 140, 160, 190);
	drawText('Destroy runs on next cycle.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(requested ? 'REQUESTED: YES' : 'REQUESTED: NO', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
