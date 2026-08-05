/**
 * @title Textmodifier.millis4
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(18, 10, 28);
	const ms = t.millis;
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	const ribbon1Y = Math.sin(ms * 0.002) * (hh * 0.6);
	const ribbon2Y = Math.cos(ms * 0.0015) * (hh * 0.6);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const waveX = Math.sin(x * 0.15 + ms * 0.003) * 4;
			const isRibbon1 = Math.abs(y - (ribbon1Y + waveX)) < 1.5;
			const isRibbon2 = Math.abs(y - (ribbon2Y - waveX)) < 1.5;

			t.push();
			t.translate(x, y);

			if (isRibbon1) {
				t.charColor(255, 210, 70);
				t.cellColor(45, 30, 10);
				t.char('~');
			} else if (isRibbon2) {
				t.charColor(160, 80, 240);
				t.cellColor(35, 12, 45);
				t.char('=');
			} else {
				t.charColor(45, 25, 60);
				t.cellColor(18, 10, 28);
				t.char('.');
			}

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
	t.print('TEXTMODIFIER.MILLIS4', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: CONTINUOUS SINUSOIDAL MILLIS', x, y++);
	t.charColor(140, 160, 190);
	t.print('Math.sin(millis * f) drives ribbons.', x, y++);
	t.print('Fluid harmonic deformation updates live.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 210, 70);
	t.print(`SINE PHASES: ${(t.millis * 0.002).toFixed(2)} RAD`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
