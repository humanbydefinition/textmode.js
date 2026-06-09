/**
 * @title Textmodifier.flipY
 */
const t = textmode.create({
	pixelDensity: 1,
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

t.draw(() => {
	t.background(6, 10, 22);
	for (let i = 0; i < 8; i++) {
		const xPos = (i - 3.5) * 3;
		t.push();
		t.translate(xPos, -3);
		t.char('V');
		t.charColor(140, 220, 255);
		t.point();
		t.pop();
		t.push();
		t.translate(xPos, 5);
		t.flipY(true);
		t.char('V');
		t.charColor(255, 210, 120);
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
	drawText('TEXTMODIFIER.FLIPY', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: MIRROR GLYPH Y', x, y++, 100, 220, 255);
	drawText('Top row is normal.', x, y++, 140, 160, 190);
	drawText('Bottom row is flipped.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`FLIP Y: ${t.flipY()}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
