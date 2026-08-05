/**
 * @title TextmodeGlyphRamp.shift
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const baseRamp = t.createGlyphRamp(' .:-=+*#%@');
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 12, 18);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const angle = Math.atan2(y, x);
			const dist = Math.hypot(x, y);
			const shiftAmt = Math.floor((angle / (Math.PI * 2)) * baseRamp.length + tm * 3);
			const shiftedRamp = baseRamp.shift(shiftAmt);
			const val = (Math.sin(dist * 0.3 - tm * 2) + 1) * 0.5;

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(60 + val * 180), Math.floor(200 - val * 80), Math.floor(240 - val * 60));
			t.cellColor(Math.floor(10 + val * 20), Math.floor(25 + val * 25), Math.floor(40 + val * 20));
			t.char(shiftedRamp.at(val));
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

	const shifted = baseRamp.shift(Math.floor(t.frameCount * 0.1));

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEGLYPHRAMP.SHIFT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: SHIFTED GLYPH RAMP COPY', x, y++);
	t.charColor(140, 160, 190);
	t.print('shift(n) returns a rotated copy.', x, y++);
	t.print('Original ramp remains unchanged.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`SHIFTED: "${shifted.characters}"`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
