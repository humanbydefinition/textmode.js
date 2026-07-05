/**
 * @title Textmodifier.abs
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let raw = 0;
let magnitude = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 7, 16);
	raw = t.sin(t.frameCount * 0.045) * 12 + t.cos(t.frameCount * 0.021) * 3;
	magnitude = t.abs(raw);

	t.char('-');
	t.charColor(60, 85, 125);
	t.line(-24, 0, 24, 0);
	t.char('|');
	t.line(0, -10, 0, 10);

	for (let i = 0; i <= t.round(magnitude); i++) {
		const fade = t.norm(i, 0, 12);
		t.push();
		t.translate(i, -5);
		t.char('#');
		t.charColor(90 + fade * 150, 190, 255 - fade * 90);
		t.point();
		t.translate(-i * 2, 10);
		t.point();
		t.pop();
	}

	t.char('@');
	t.charColor(255, 150, 110);
	t.push();
	t.translate(t.round(raw), 0);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ABS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DISTANCE FROM ZERO', x, y++, 100, 220, 255);
	drawText('abs() removes the sign.', x, y++, 140, 160, 190);
	drawText('Both sides draw equal magnitude.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RAW: ${raw.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`ABS: ${magnitude.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
