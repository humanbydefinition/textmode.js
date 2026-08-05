/**
 * @title TextmodeColor.a
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const fogLayer = t.layers.add({ blendMode: t.BLEND_NORMAL });
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(14, 14, 18);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const gridPattern = Math.abs(x % 4 === 0 || y % 4 === 0 ? 1 : 0);
			if (gridPattern) {
				t.push();
				t.translate(x, y);
				t.charColor(240, 80, 40);
				t.cellColor(40, 16, 10);
				t.char('+');
				t.point();
				t.pop();
			}
		}
	}
});

fogLayer.draw(() => {
	t.clear();
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(x * 0.15 + tm) * Math.cos(y * 0.15 - tm * 0.8);
			const alphaVal = Math.floor(Math.max(0, Math.min(255, (wave + 1) * 0.5 * 255)));

			const col = t.color(60, 200, 230, alphaVal);
			const a = col.a;

			if (a > 30) {
				const idx = Math.floor((a / 255) * (RAMP.length - 1));
				t.push();
				t.translate(x, y);
				t.charColor(col.r, col.g, col.b, a);
				t.cellColor(10, 40, 50, a);
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

	const sampleCol = t.color(60, 200, 230, 180);
	const a = sampleCol.a;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODECOLOR.A', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: DISSOLVE FOG MATRIX', x, y++);
	t.charColor(140, 160, 190);
	t.print('Top layer col.a modulates opacity.', x, y++);
	t.print('Reveals crimson geometric backdrop.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`SAMPLE ALPHA: ${a} / 255`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
