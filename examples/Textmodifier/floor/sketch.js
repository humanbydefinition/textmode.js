/**
 * @title Textmodifier.floor
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let raw = 0;
let snapped = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(4, 8, 16);
	raw = t.sin(t.frameCount * 0.035) * 11 + t.cos(t.frameCount * 0.023) * 3;
	snapped = t.floor(raw);

	for (let x = -24; x <= 24; x++) {
		t.char(x === snapped ? '#' : '.');
		t.charColor(x === snapped ? 255 : 55, x === snapped ? 220 : 70, 120);
		t.push();
		t.translate(x, 0);
		t.point();
		t.pop();
	}

	t.char('|');
	t.charColor(110, 220, 255);
	t.line(snapped, -9, snapped, 9);
	t.char('@');
	t.charColor(255, 140, 120);
	t.push();
	t.translate(t.round(raw), -5);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.FLOOR', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SNAP DOWN', x, y++, 100, 220, 255);
	drawText('floor() chooses the lower cell.', x, y++, 140, 160, 190);
	drawText('Red input becomes blue column.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RAW: ${raw.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`FLOOR: ${snapped}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
