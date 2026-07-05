/**
 * @title Textmodifier.LINE_STRIP
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.LINE_STRIP;
const modeName = 'LINE_STRIP';
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
	t.background(5, 12, 25);
	t.lineWeight(0.8);
	t.beginShape(mode);
	for (let i = 0; i < 70; i++) {
		const p = i / 69;
		const x = -22 + p * 44;
		const y = Math.sin(p * Math.PI * 6 + time * 2) * 5 + Math.sin(p * 19 - time) * 2;
		t.char(i % 4 === 0 ? '@' : '~');
		t.charColor(80 + p * 160, 170 + Math.sin(p * 7) * 70, 255);
		t.vertex(x, y);
	}
	t.endShape();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.LINE_STRIP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: OPEN CONTINUOUS PATH', x, y++, 100, 220, 255);
	drawText('Consecutive vertices connect.', x, y++, 140, 160, 190);
	drawText('The ends remain open.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
