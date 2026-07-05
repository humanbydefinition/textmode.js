/**
 * @title Textmodifier.createGlyphRamp
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const baseRamp = t.createGlyphRamp(' ░▒▓█');

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(5, 8, 18);

	const ramp = baseRamp.shift(t.frameCount * 0.08);
	for (let x = 0; x < t.grid.cols; x++) {
		for (let y = 0; y < t.grid.rows; y++) {
			const gx = x - Math.floor(t.grid.cols / 2);
			const gy = y - Math.floor(t.grid.rows / 2);
			const value = t.noise(x * 0.08, y * 0.12, t.secs * 0.3);

			t.push();
			t.translate(gx, gy);
			t.charColor(80 + value * 140, 160 + value * 80, 230);
			t.char(ramp.at(value));
			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.CREATEGLYPHRAMP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: GLYPH DENSITY RAMP', x, y++, 100, 220, 255);
	drawText('Glyph strings create ramps.', x, y++, 140, 160, 190);
	drawText('shift() cycles without mutating.', x, y++, 140, 160, 190);
	drawText(`ramp: ${baseRamp.characters}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
