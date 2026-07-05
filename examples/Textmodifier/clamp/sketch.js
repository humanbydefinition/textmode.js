/**
 * @title Textmodifier.clamp
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let raw = 0;
let clamped = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function drawPoint(x, y) {
	t.push();
	t.translate(x, y);
	t.point();
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
	t.background(8, 9, 17);
	const low = -10;
	const high = 10;
	const railWidth = high - low + 1;
	raw = Math.sin(t.frameCount * 0.045) * 18 + t.mouse.x * 0.28;
	clamped = t.clamp(raw, low, high);

	t.char('.');
	t.charColor(38, 50, 80);
	for (let x = -22; x <= 22; x += 2) drawPoint(x, 0);

	drawBand((low + high) / 2, -5, railWidth, 1, 80, 130, 190);
	drawBand((low + high) / 2, 5, railWidth, 1, 80, 130, 190);
	drawBand(low, 0, 1, 11, 55, 120, 155);
	drawBand(high, 0, 1, 11, 55, 120, 155);

	t.push();
	t.translate(raw, -5);
	t.char('o');
	t.charColor(230, 90, 90);
	t.point();
	t.pop();

	t.push();
	t.translate(clamped, 0);
	t.char('#');
	t.charColor(110, 245, 170);
	t.rect(2, 11);
	t.pop();

	t.char('*');
	t.charColor(255, 205, 90);
	t.line(raw, -5, clamped, 0);
	t.line(raw, 5, clamped, 0);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CLAMP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: HARD LIMITS', x, y++, 100, 220, 255);
	drawText('Raw red input can leave the gate.', x, y++, 140, 160, 190);
	drawText('clamp() pins output to the rails.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RAW: ${raw.toFixed(1)}`, x, y++, 255, 150, 120);
	drawText(`CLAMPED: ${clamped.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
