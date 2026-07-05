/**
 * @title Textmodifier.TRIANGLE_FAN
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.TRIANGLE_FAN;
const modeName = 'TRIANGLE_FAN';
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
	t.background(10, 8, 24);
	t.beginShape(mode);
	t.char('@');
	t.charColor(255, 245, 180);
	t.cellColor(65, 40, 20);
	t.vertex(0, 0);
	for (let i = 0; i <= 48; i++) {
		const p = i / 48;
		const a = p * Math.PI * 2 + time;
		const r = 12 + Math.sin(a * 6 - time * 3) * 2;
		t.char(i % 3 ? '*' : '#');
		t.charColor(255, 130 + Math.sin(a) * 70, 90 + Math.cos(a) * 60);
		t.cellColor(55 + Math.sin(a) * 20, 18, 12);
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
	drawText('TEXTMODIFIER.TRIANGLE_FAN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SHARED CENTER', x, y++, 100, 220, 255);
	drawText('Every triangle uses vertex 1.', x, y++, 140, 160, 190);
	drawText('Great for radial bursts.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
