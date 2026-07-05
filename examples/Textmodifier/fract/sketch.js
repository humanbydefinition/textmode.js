/**
 * @title Textmodifier.fract
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let raw = 0;
let fraction = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(4, 7, 17);
	raw = t.frameCount * 0.035 + t.sin(t.frameCount * 0.021) * 0.5;
	fraction = t.fract(raw);

	for (let x = -24; x <= 24; x++) {
		const f = t.fract(raw + x * 0.18);
		const y = 8 - f * 14;
		t.push();
		t.translate(x, y);
		t.char(f > 0.75 ? '#' : f > 0.35 ? '+' : '.');
		t.charColor(80 + f * 160, 135 + f * 100, 255);
		t.point();
		t.pop();
	}

	t.char('|');
	t.charColor(255, 210, 100);
	t.line(0, 8, 0, 8 - fraction * 14);
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.FRACT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: REPEATING DECIMALS', x, y++, 100, 220, 255);
	drawText('fract(x) keeps the part after dot.', x, y++, 140, 160, 190);
	drawText('The ramp resets at every integer.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RAW: ${raw.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`FRACT: ${fraction.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
