/**
 * @title Textmodifier.windowHeight
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let winH = 0;
let fill = 0;

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
	t.background(7, 9, 19);
	winH = t.windowHeight;
	const halfRows = Math.floor(t.grid.rows / 2);
	const top = -halfRows + 4;
	const bottom = halfRows - 4;
	const height = Math.max(6, bottom - top + 1);
	const center = (top + bottom) / 2;
	fill = t.constrain(Math.round(t.map(winH, 240, Math.max(241, t.displayHeight), 4, height)), 4, height);

	drawBand(-10, center, 1, height, 60, 120, 170);
	drawBand(10, center, 1, height, 60, 120, 170);
	drawBand(0, top, 21, 1, 42, 58, 92);
	drawBand(0, bottom, 21, 1, 42, 58, 92);
	drawBand(0, bottom - fill / 2 + 0.5, 1, fill, 125, 245, 185);

	for (let i = 0; i < height; i += 2) {
		const y = bottom - i;
		const width = Math.round(t.map(Math.cos(i * 0.55 + t.frameCount * 0.05), -1, 1, 3, 14));
		const active = i <= fill;
		t.push();
		t.translate(0, y);
		t.char(active ? '=' : '-');
		t.charColor(active ? 255 : 60, active ? 175 : 85, active ? 105 : 120);
		t.rect(width, 1);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.WINDOWHEIGHT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: VIEWPORT HEIGHT', x, y++, 100, 220, 255);
	drawText('windowHeight reads innerHeight live.', x, y++, 140, 160, 190);
	drawText('Resize browser to lift the meter.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`HEIGHT: ${winH} PX`, x, y++, 140, 255, 180);
	drawText(`CELLS: ${fill}`, x, y++, 255, 210, 120);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
