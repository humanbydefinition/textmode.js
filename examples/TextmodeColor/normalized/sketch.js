/**
 * @title TextmodeColor.normalized
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 8, 16);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const time = t.frameCount * 0.025;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const r = Math.floor((Math.sin(x * 0.12 + time) * 0.5 + 0.5) * 255);
			const g = Math.floor((Math.cos(y * 0.14 - time * 0.8) * 0.5 + 0.5) * 255);
			const b = Math.floor((Math.sin(x * 0.08 + y * 0.08 + time * 1.4) * 0.5 + 0.5) * 255);

			const col = t.color(r, g, b);
			const [nr, ng, nb] = col.normalized;

			const lum = nr * 0.3 + ng * 0.59 + nb * 0.11;
			if (lum > 0.25) {
				const normLum = (lum - 0.25) / 0.75;
				const idx = Math.min(RAMP.length - 1, Math.floor(normLum * RAMP.length));

				t.push();
				t.translate(x, y);
				t.charColor(nr * 255, ng * 255, nb * 255);
				t.cellColor(nr * 35, ng * 35, nb * 35);
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

	const sampleCol = t.color(255, 128, 64);
	const [nr, ng, nb] = sampleCol.normalized;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODECOLOR.NORMALIZED', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: NORMALIZED RGBA CHANNELS', x, y++);
	t.charColor(140, 160, 190);
	t.print('Returns [0..1] float array for RGBA.', x, y++);
	t.print('Drives luminance & cell tinting.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`SAMPLE NORM: [${nr.toFixed(2)}, ${ng.toFixed(2)}, ${nb.toFixed(2)}]`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
