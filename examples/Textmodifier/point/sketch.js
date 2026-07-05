/**
 * @title Textmodifier.point
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

t.draw(() => {
	t.background(6, 10, 22);
	const count = 24;
	for (let i = 0; i < count; i++) {
		const angle = t.frameCount * 0.03 + (i / count) * Math.PI * 2;
		const radius = 5 + (i % 4) * 2;
		t.push();
		t.translate(Math.cos(angle) * radius * 1.6, Math.sin(angle) * radius);
		t.char(i % 2 === 0 ? '+' : '.');
		t.charColor(120 + i * 4, 180, 255 - i * 3);
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
	drawText('TEXTMODIFIER.POINT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DRAW ONE CELL', x, y++, 100, 220, 255);
	drawText('point() stamps the active glyph.', x, y++, 140, 160, 190);
	drawText('Each dot uses its own transform.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('API: t.point()', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
