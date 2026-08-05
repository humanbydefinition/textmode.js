/**
 * @title TextmodeGlyphRamp.creation
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const ramp = t.createGlyphRamp(' .:-=+*#%@');
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 12, 16);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.035;

	const seeds = [
		{ x: Math.cos(tm) * (hw * 0.5), y: Math.sin(tm * 0.8) * (hh * 0.5) },
		{ x: Math.cos(tm + 2) * (hw * 0.5), y: Math.sin(tm * 1.1 + 2) * (hh * 0.5) },
		{ x: Math.cos(tm + 4) * (hw * 0.5), y: Math.sin(tm * 0.9 + 4) * (hh * 0.5) },
	];

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			let dMin = Infinity;
			for (let i = 0; i < seeds.length; i++) {
				const d = Math.hypot(x - seeds[i].x, y - seeds[i].y);
				if (d < dMin) dMin = d;
			}

			const val = Math.min(1, dMin / (hw * 0.65));

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(40 + val * 200), Math.floor(220 - val * 100), Math.floor(160 + val * 85));
			t.cellColor(Math.floor(6 + val * 15), Math.floor(18 + val * 20), Math.floor(24 + val * 25));
			t.char(ramp.at(val));
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

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEGLYPHRAMP.CREATION', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: VORONOI GLYPH RAMP MAPPING', x, y++);
	t.charColor(140, 160, 190);
	t.print('Creates reusable density ramps.', x, y++);
	t.print('Maps Voronoi distances to glyphs.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`RAMP LENGTH: ${ramp.length} GLYPHS`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
