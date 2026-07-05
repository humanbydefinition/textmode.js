/**
 * @title Textmodifier.QUAD_STRIP
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.QUAD_STRIP;
const modeName = 'QUAD_STRIP';
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
	t.background(8, 8, 24);
	t.beginShape(mode);
	for (let i = 0; i < 28; i++) {
		const p = i / 27;
		const x = -20 + p * 40;
		const y = Math.sin(p * Math.PI * 4 + time * 2) * 5;
		const width = 2 + Math.cos(time + i) * 0.8;
		t.char(i % 2 ? '=' : '#');
		t.charColor(255 - p * 80, 140 + p * 90, 210);
		t.cellColor(40 + p * 30, 16, 45 + p * 40);
		t.vertex(x, y - width);
		t.vertex(x, y + width);
	}
	t.endShape();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.QUAD_STRIP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CONNECTED QUAD BAND', x, y++, 100, 220, 255);
	drawText('Each pair extends the strip.', x, y++, 140, 160, 190);
	drawText('Good for thick flowing paths.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
