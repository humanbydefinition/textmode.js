/**
 * @title Textmodifier.TRIANGLE_STRIP
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.TRIANGLE_STRIP;
const modeName = 'TRIANGLE_STRIP';
const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.04;
	t.background(5, 12, 26);
	t.beginShape(mode);
	for (let i = 0; i < 42; i++) {
		const p = i / 41;
		const x = -20 + p * 40;
		const wave = Math.sin(p * Math.PI * 5 + time * 2) * 4;
		const side = i % 2 === 0 ? -2.5 : 2.5;
		t.char(i % 2 === 0 ? '/' : '\\');
		t.charColor(100 + p * 120, 240 - p * 70, 255);
		t.cellColor(8, 28 + p * 40, 45 + p * 70);
		t.vertex(x, wave + side);
	}
	t.endShape();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.TRIANGLE_STRIP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CONNECTED RIBBON', x, y++, 100, 220, 255);
	drawText('Each new vertex adds a face.', x, y++, 140, 160, 190);
	drawText('Alternating sides make width.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
