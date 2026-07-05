/**
 * @title Textmodifier.displayWidth
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let displayW = 0;
let ratio = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function drawBand(x, y, width, height, r, g, b) {
	t.push();
	t.translate(x, y);
	t.char('█');
	t.charColor(r, g, b);
	t.rect(width, height);
	t.pop();
}

t.draw(() => {
	t.background(7, 10, 18);
	displayW = t.displayWidth;
	ratio = t.windowWidth / Math.max(1, displayW);
	const full = 30;
	const visible = Math.round(t.constrain(t.map(ratio, 0, 1, 3, full), 3, full));

	drawBand(0, -6, full + 4, 1, 42, 58, 88);
	drawBand(0, 6, full + 4, 1, 42, 58, 88);
	drawBand(-full / 2 - 2, 0, 1, 13, 70, 135, 185);
	drawBand(full / 2 + 2, 0, 1, 13, 70, 135, 185);
	drawBand(-full / 2 + visible / 2, 0, visible, 7, 65, 125, 170);

	for (let i = 0; i <= full; i += 3) {
		const x = -full / 2 + i;
		const glow = i <= visible;
		t.push();
		t.translate(x, Math.sin(t.frameCount * 0.04 + i) * 2);
		t.char(glow ? '@' : '.');
		t.charColor(glow ? 255 : 80, glow ? 205 : 95, glow ? 120 : 125);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.DISPLAYWIDTH', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SCREEN WIDTH', x, y++, 100, 220, 255);
	drawText('displayWidth reads screen.width.', x, y++, 140, 160, 190);
	drawText('Window width is shown inside it.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`DISPLAY: ${displayW} PX`, x, y++, 255, 200, 100);
	drawText(`WINDOW: ${(ratio * 100).toFixed(0)}%`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
