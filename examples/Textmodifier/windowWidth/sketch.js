/**
 * @title Textmodifier.windowWidth
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let winW = 0;
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
	t.background(5, 10, 18);
	winW = t.windowWidth;
	const halfCols = Math.floor(t.grid.cols / 2);
	const left = -halfCols + 4;
	const right = halfCols - 4;
	const width = Math.max(6, right - left + 1);
	const center = (left + right) / 2;
	fill = t.constrain(Math.round(t.map(winW, 320, Math.max(321, t.displayWidth), 4, width)), 4, width);

	drawBand(center, -7, width, 1, 40, 55, 85);
	drawBand(center, 7, width, 1, 40, 55, 85);
	drawBand(left, 0, 1, 15, 75, 145, 190);
	drawBand(right, 0, 1, 15, 75, 145, 190);
	drawBand(left + fill / 2 - 0.5, 0, fill, 1, 120, 245, 190);

	for (let i = 0; i < width; i += 2) {
		const x = left + i;
		const height = Math.round(t.map(Math.sin(i * 0.4 + t.frameCount * 0.04), -1, 1, 2, 10));
		const active = i <= fill;
		t.push();
		t.translate(x, 0);
		t.char(active ? '#' : ':');
		t.charColor(active ? 120 : 45, active ? 220 : 70, active ? 255 : 110);
		t.rect(1, height);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.WINDOWWIDTH', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: VIEWPORT WIDTH', x, y++, 100, 220, 255);
	drawText('windowWidth reads innerWidth live.', x, y++, 140, 160, 190);
	drawText('Resize browser to move the meter.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`WIDTH: ${winW} PX`, x, y++, 140, 255, 180);
	drawText(`CELLS: ${fill}`, x, y++, 255, 210, 120);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
