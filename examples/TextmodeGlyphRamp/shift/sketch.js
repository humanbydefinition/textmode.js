/**
 * @title TextmodeGlyphRamp.shift
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const baseRamp = t.createGlyphRamp('0123456789ABCDEF');

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(7, 7, 20);

	const ramp = baseRamp.shift(t.frameCount * 0.12);
	const cols = Math.min(t.grid.cols - 8, 44);
	const rows = Math.min(t.grid.rows - 12, 18);
	const left = -Math.floor(cols / 2);
	const top = -Math.floor(rows / 2) + 4;

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const value = t.noise(x * 0.1, y * 0.16, t.secs * 0.4);

			t.push();
			t.translate(left + x, top + y);
			t.charColor(90 + value * 120, 140 + value * 90, 255);
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
	const shifted = baseRamp.shift(t.frameCount * 0.12);

	drawText('TEXTMODEGLYPHRAMP.SHIFT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ROTATED COPY', x, y++, 100, 220, 255);
	drawText('shift() returns a new ramp.', x, y++, 140, 160, 190);
	drawText('The original ramp is unchanged.', x, y++, 140, 160, 190);
	drawText(`now: ${shifted.characters}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
