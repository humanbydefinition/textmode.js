/**
 * @title TextmodeGlyphRamp.creation
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const ramp = t.createGlyphRamp(' .:-=+*#%@');

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(8, 7, 18);

	const cols = Math.min(t.grid.cols, 48);
	const left = -Math.floor(cols / 2);
	const top = -4;

	for (let x = 0; x < cols; x++) {
		const value = cols <= 1 ? 0 : x / (cols - 1);
		const height = Math.floor(t.map(value, 0, 1, 2, 12));

		for (let y = 0; y < height; y++) {
			t.push();
			t.translate(left + x, top + 12 - y);
			t.charColor(90 + value * 150, 170 + value * 60, 210);
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

	drawText('TEXTMODEGLYPHRAMP.CREATION', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: VALUES TO GLYPHS', x, y++, 100, 220, 255);
	drawText('at(0) returns the first glyph.', x, y++, 140, 160, 190);
	drawText('at(1) returns the final glyph.', x, y++, 140, 160, 190);
	drawText(`length: ${ramp.length}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
