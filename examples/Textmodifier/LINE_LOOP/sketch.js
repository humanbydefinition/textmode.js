/**
 * @title Textmodifier.LINE_LOOP
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.LINE_LOOP;
const modeName = 'LINE_LOOP';
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
	t.background(7, 10, 24);
	t.lineWeight(0.7);
	t.beginShape(mode);
	for (let i = 0; i < 64; i++) {
		const p = i / 64;
		const a = p * Math.PI * 2;
		const r = 10 + Math.sin(a * 5 + time * 2) * 2 + Math.cos(a * 3 - time) * 1.5;
		t.char(i % 5 === 0 ? '#' : '+');
		t.charColor(120 + Math.sin(a) * 80, 210, 180 + Math.cos(a) * 60);
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
	drawText('TEXTMODIFIER.LINE_LOOP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CLOSED OUTLINE', x, y++, 100, 220, 255);
	drawText('Last vertex returns to first.', x, y++, 140, 160, 190);
	drawText('Good for orbiting contours.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
