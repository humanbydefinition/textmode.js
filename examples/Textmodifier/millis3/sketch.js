/**
 * @title Textmodifier.millis3
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.keyPressed((data) => {
	if (data.key === ' ') t.millis = 0;
});

t.draw(() => {
	t.background(6, 10, 22);
	const progress = (t.millis % 3000) / 3000;
	for (let i = 0; i < 24; i++) {
		t.push();
		t.translate(-12 + i, 3);
		t.char(i / 24 < progress ? '#' : '.');
		t.charColor(140, 220, 255);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MILLIS3', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RESET MILLIS', x, y++, 100, 220, 255);
	drawText('Space resets elapsed millis.', x, y++, 140, 160, 190);
	drawText('Progress bar loops every 3s.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MS: ${Math.floor(t.millis)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
