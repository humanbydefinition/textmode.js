/**
 * @title TextmodeColor.rgba
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const topLayer = t.layers.add({ blendMode: t.BLEND_NORMAL });
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(10, 10, 18);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			if ((x + y) % 3 === 0) {
				t.push();
				t.translate(x, y);
				t.charColor(50, 60, 80);
				t.char('.');
				t.point();
				t.pop();
			}
		}
	}
});

topLayer.draw(() => {
	t.clear();
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03;
	const d1x = Math.cos(tm) * (hw * 0.3);
	const d1y = Math.sin(tm) * (hh * 0.3);
	const d2x = Math.cos(tm + 2.1) * (hw * 0.3);
	const d2y = Math.sin(tm + 2.1) * (hh * 0.3);
	const rad = Math.min(hw, hh) * 0.45;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const in1 = Math.hypot(x - d1x, y - d1y) < rad;
			const in2 = Math.hypot(x - d2x, y - d2y) < rad;
			if (in1 || in2) {
				const col = t.color(
					in2 ? 240 : 40,
					in1 && in2 ? 220 : in1 ? 200 : 180,
					in1 ? 240 : 40,
					in1 && in2 ? 220 : 140
				);
				const [cr, cg, cb, ca] = col.rgba;
				const idx = Math.min(RAMP.length - 1, Math.floor((ca / 255) * RAMP.length));
				t.push();
				t.translate(x, y);
				t.charColor(cr, cg, cb, ca);
				t.cellColor(Math.floor(cr * 0.2), Math.floor(cg * 0.2), Math.floor(cb * 0.2), ca);
				t.char(RAMP[idx]);
				t.point();
				t.pop();
			}
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const sampleCol = t.color(40, 200, 240, 140);
	const [r, g, b, a] = sampleCol.rgba;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODECOLOR.RGBA', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: OVERLAPPING RGBA DISKS', x, y++);
	t.charColor(140, 160, 190);
	t.print('Unpacks [r, g, b, a] tuple array.', x, y++);
	t.print('Composites translucent orbital lenses.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`SAMPLE RGBA: [${r}, ${g}, ${b}, ${a}]`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
