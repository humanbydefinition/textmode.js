/**
 * @title TextmodeColor.rgb
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 6, 16);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;

	const rx = Math.sin(tm * 1.2) * (hw * 0.6);
	const ry = Math.cos(tm * 0.8) * (hh * 0.6);

	const gx = Math.cos(tm * 0.9 + 1.5) * (hw * 0.6);
	const gy = Math.sin(tm * 1.3 + 1.5) * (hh * 0.6);

	const bx = Math.sin(tm * 0.7 + 3.0) * (hw * 0.6);
	const by = Math.cos(tm * 1.1 + 3.0) * (hh * 0.6);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dr = Math.hypot(x - rx, y - ry);
			const dg = Math.hypot(x - gx, y - gy);
			const db = Math.hypot(x - bx, y - by);

			const rVal = Math.floor(Math.max(0, 255 - dr * 14));
			const gVal = Math.floor(Math.max(0, 255 - dg * 14));
			const bVal = Math.floor(Math.max(0, 255 - db * 14));

			const col = t.color(rVal, gVal, bVal);
			const [r, g, b] = col.rgb;

			const maxVal = Math.max(r, g, b);
			if (maxVal > 30) {
				const idx = Math.min(RAMP.length - 1, Math.floor((maxVal / 255) * RAMP.length));
				t.push();
				t.translate(x, y);
				t.charColor(r, g, b);
				t.cellColor(Math.floor(r * 0.18), Math.floor(g * 0.18), Math.floor(b * 0.18));
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

	const sampleCol = t.color(240, 120, 60);
	const [r, g, b] = sampleCol.rgb;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODECOLOR.RGB', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: KINETIC RGB LASER WEAVER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Extracts [r, g, b] tuple array.', x, y++);
	t.print('Weaves Lissajous light nodes.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`SAMPLE RGB: [${r}, ${g}, ${b}]`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
