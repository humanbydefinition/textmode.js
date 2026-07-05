/**
 * @title Textmodifier.POINTS
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.POINTS;
const modeName = 'POINTS';
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
	t.background(6, 10, 24);
	t.beginShape(mode);
	for (let i = 0; i < 96; i++) {
		const a = i * 13.7 + t.frameCount * 1.4;
		const r = 2 + i * 0.12 + Math.sin(time * 2 + i) * 1.2;
		t.char(i % 3 === 0 ? '*' : '.');
		t.charColor(90 + i, 180 + Math.sin(i) * 50, 255);
		t.cellColor(4, 12 + (i % 6) * 5, 30);
		t.vertex(Math.cos(a) * r, Math.sin(a) * r);
	}
	t.endShape();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.POINTS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: VERTEX PARTICLES', x, y++, 100, 220, 255);
	drawText('Each vertex becomes a point.', x, y++, 140, 160, 190);
	drawText('No edges connect the marks.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
