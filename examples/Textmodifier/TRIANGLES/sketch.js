/**
 * @title Textmodifier.TRIANGLES
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.TRIANGLES;
const modeName = 'TRIANGLES';
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
	t.background(8, 8, 20);
	t.beginShape(mode);
	for (let i = 0; i < 18; i++) {
		const a = i * 20 + t.frameCount;
		const cx = Math.cos(a) * (5 + (i % 3) * 4);
		const cy = Math.sin(a) * (5 + (i % 4) * 2);
		const size = 2 + Math.sin(time + i) * 0.8;
		t.char(i % 2 ? '^' : '#');
		t.charColor(250, 110 + i * 6, 150 + i * 3);
		t.cellColor(40 + i * 4, 10, 25);
		t.vertex(cx + Math.cos(a) * size, cy + Math.sin(a) * size);
		t.vertex(cx + Math.cos(a + 120) * size, cy + Math.sin(a + 120) * size);
		t.vertex(cx + Math.cos(a + 240) * size, cy + Math.sin(a + 240) * size);
	}
	t.endShape();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.TRIANGLES', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: INDEPENDENT FACETS', x, y++, 100, 220, 255);
	drawText('Every three vertices fill.', x, y++, 140, 160, 190);
	drawText('Each triangle stands alone.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
