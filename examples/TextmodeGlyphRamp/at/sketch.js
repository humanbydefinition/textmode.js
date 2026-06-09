/**
 * @title TextmodeGlyphRamp.at
 */
const t = textmode.create({
	pixelDensity: 1,
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
	t.background(6, 8, 18);

	const width = Math.min(t.grid.cols - 10, 52);
	const left = -Math.floor(width / 2);
	const baseline = 6;
	const min = -Math.PI;
	const max = Math.PI;

	for (let x = 0; x < width; x++) {
		const phase = t.map(x, 0, Math.max(1, width - 1), min, max);
		const wave = Math.sin(phase + t.secs * 1.6);
		const y = Math.round(t.map(wave, -1, 1, baseline + 8, baseline - 8));

		t.push();
		t.translate(left + x, y);
		t.charColor(120 + wave * 60, 190, 240);
		t.char(ramp.at(wave, -1, 1));
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODEGLYPHRAMP.AT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: MAP VALUE TO GLYPH', x, y++, 100, 220, 255);
	drawText('at(v) accepts normalized values.', x, y++, 140, 160, 190);
	drawText('at(v, min, max) remaps ranges.', x, y++, 140, 160, 190);
	drawText(`g: ${ramp.at(Math.sin(t.secs), -1, 1)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
