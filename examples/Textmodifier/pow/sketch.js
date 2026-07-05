/**
 * @title Textmodifier.pow
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let exponent = 1;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 8, 17);
	exponent = 0.5 + t.norm(t.sin(t.frameCount * 0.03) + t.cos(t.frameCount * 0.017) * 0.4, -1.4, 1.4) * 3;

	for (let i = 0; i <= 40; i++) {
		const u = i / 40;
		const shaped = t.pow(u, exponent);
		const x = -20 + i;
		const y = 8 - shaped * 16;
		const heat = shaped;
		t.push();
		t.translate(x, y);
		t.char(heat > 0.7 ? '#' : heat > 0.3 ? '+' : '.');
		t.charColor(90 + heat * 150, 150 + heat * 80, 255 - heat * 90);
		t.point();
		t.pop();
	}

	t.char('-');
	t.charColor(65, 85, 125);
	t.line(-20, 8, 20, 8);
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.POW', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CURVE SHAPING', x, y++, 100, 220, 255);
	drawText('pow(base, exp) bends 0..1.', x, y++, 140, 160, 190);
	drawText('Small exponents lift the curve.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`EXPONENT: ${exponent.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
