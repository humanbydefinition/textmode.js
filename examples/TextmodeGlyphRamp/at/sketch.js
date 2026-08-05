/**
 * @title TextmodeGlyphRamp.at
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const ramp = t.createGlyphRamp(' .:-=+*#%@');
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(14, 8, 14);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.02;

	const n = 3 + Math.sin(tm * 0.5);
	const m = 5 + Math.cos(tm * 0.5);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const nx = (x / (hw || 1)) * Math.PI;
			const ny = (y / (hh || 1)) * Math.PI;
			const w = Math.cos(n * nx) * Math.cos(m * ny) - Math.cos(m * nx) * Math.cos(n * ny);

			const norm = (w + 2) / 4;
			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(255 - norm * 160), Math.floor(100 + norm * 150), Math.floor(200 - norm * 120));
			t.cellColor(Math.floor(25 - norm * 15), Math.floor(8 + norm * 12), Math.floor(20 + norm * 10));
			t.char(ramp.at(w, -2, 2));
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

	const sampleW = Math.sin(t.frameCount * 0.05) * 2;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEGLYPHRAMP.AT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: CHLADNI CYMATIC RESONANCE', x, y++);
	t.charColor(140, 160, 190);
	t.print('at(v, min, max) remaps standing wave', x, y++);
	t.print('nodal lines directly to the ramp.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`W: ${sampleW.toFixed(2)} -> GLYPH: "${ramp.at(sampleW, -2, 2)}"`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
