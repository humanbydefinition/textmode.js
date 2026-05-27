/**
 * @title Textmode.version
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 12, 10);
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.translate(x, y);
	t.charColor(r, g, b);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODE.VERSION', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: EXPOSES LIBRARY VERSION', x, y++, 100, 220, 255);
	drawText('Retrieves active semantic version.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`VERSION: ${textmode.version}`, x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
