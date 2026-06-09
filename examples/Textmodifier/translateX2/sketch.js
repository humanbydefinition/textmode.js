/**
 * @title Textmodifier.translateX2
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
	const time = t.frameCount * 0.04;
	for (let i = 0; i < 4; i++) {
		t.push();
		t.translateY((i - 1.5) * 4);
		t.translateX(Math.sin(time + i) * 14);
		t.char(String(i + 1));
		t.charColor(120 + i * 30, 220, 255 - i * 20);
		t.rect(4, 2);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.TRANSLATEX2', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LAYERED X MOTION', x, y++, 100, 220, 255);
	drawText('Independent rows move on X.', x, y++, 140, 160, 190);
	drawText('Each block uses local state.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('API: t.translateX(x)', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
