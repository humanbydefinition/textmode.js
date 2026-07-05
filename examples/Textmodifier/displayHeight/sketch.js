/**
 * @title Textmodifier.displayHeight
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let displayH = 0;
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
	t.background(8, 9, 20);
	displayH = t.displayHeight;
	ratio = t.windowHeight / Math.max(1, displayH);
	const full = 18;
	const visible = Math.round(t.constrain(t.map(ratio, 0, 1, 3, full), 3, full));

	drawBand(-8, 0, 1, full + 2, 70, 135, 185);
	drawBand(8, 0, 1, full + 2, 70, 135, 185);
	drawBand(0, -full / 2 - 1, 17, 1, 42, 58, 88);
	drawBand(0, full / 2 + 1, 17, 1, 42, 58, 88);
	drawBand(0, full / 2 - visible / 2, 11, visible, 62, 120, 165);

	for (let i = 0; i <= full; i += 2) {
		const y = full / 2 - i;
		const glow = i <= visible;
		t.push();
		t.translate(Math.cos(t.frameCount * 0.04 + i) * 4, y);
		t.char(glow ? '*' : '.');
		t.charColor(glow ? 255 : 75, glow ? 210 : 95, glow ? 125 : 130);
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
	drawText('TEXTMODIFIER.DISPLAYHEIGHT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SCREEN HEIGHT', x, y++, 100, 220, 255);
	drawText('displayHeight reads screen.height.', x, y++, 140, 160, 190);
	drawText('Window height is shown inside it.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`DISPLAY: ${displayH} PX`, x, y++, 255, 200, 100);
	drawText(`WINDOW: ${(ratio * 100).toFixed(0)}%`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
