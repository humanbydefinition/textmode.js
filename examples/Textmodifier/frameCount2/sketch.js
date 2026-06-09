/**
 * @title Textmodifier.frameCount2
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

t.keyPressed((data) => {
	if (data.key === ' ') t.frameCount = 0;
});

t.draw(() => {
	t.background(6, 10, 22);
	const phase = (t.frameCount % 120) / 120;
	t.push();
	t.translate(-16 + phase * 32, 2);
	t.char('@');
	t.charColor(255, 210, 120);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.FRAMECOUNT2', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RESET COUNTER', x, y++, 100, 220, 255);
	drawText('Space rewinds animation.', x, y++, 140, 160, 190);
	drawText('frameCount is writable.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`FRAME: ${t.frameCount}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
