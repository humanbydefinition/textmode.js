/**
 * @title Textmodifier.LINES
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.LINES;
const modeName = 'LINES';
const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.035;
	t.background(8, 8, 22);
	t.lineWeight(0.7);
	t.beginShape(mode);
	for (let i = 0; i < 30; i++) {
		const a = i * 12 + t.frameCount * 0.9;
		const r1 = 4 + Math.sin(time + i) * 2;
		const r2 = 13 + Math.cos(time * 1.7 + i) * 3;
		t.char(i % 2 ? '/' : '\\');
		t.charColor(120 + i * 4, 240 - i * 3, 210);
		t.vertex(Math.cos(a) * r1, Math.sin(a) * r1);
		t.vertex(Math.cos(a + 30) * r2, Math.sin(a + 30) * r2);
	}
	t.endShape();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.LINES', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PAIRED SEGMENTS', x, y++, 100, 220, 255);
	drawText('Every two vertices connect.', x, y++, 140, 160, 190);
	drawText('Each pair stays separate.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
