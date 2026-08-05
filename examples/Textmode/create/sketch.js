/**
 * @title Textmode.create
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const RAMP = '.+*#%@';

t.draw(() => {
	t.background(6, 20, 14);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x * 0.8, y);
			const ring = (Math.sin(dist * 0.4 - tm) + 1) * 0.5;
			const hexPattern = Math.abs(Math.sin(x * 0.3) * Math.cos(y * 0.3));

			const val = ring * 0.7 + hexPattern * 0.3;
			if (val > 0.4) {
				const idx = Math.floor(((val - 0.4) / 0.6) * (RAMP.length - 1));
				t.push();
				t.translate(x, y);
				t.charColor(Math.floor(40 + val * 180), Math.floor(180 + val * 75), Math.floor(120 + val * 100));
				t.cellColor(4, Math.floor(16 + val * 30), 10);
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

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODE.CREATE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: GENESIS MATRIX WAVEFRONT', x, y++);
	t.charColor(140, 160, 190);
	t.print('Instantiates a Textmodifier instance.', x, y++);
	t.print('Initializes grid resolution & context.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`GRID SIZE: ${t.grid.cols}x${t.grid.rows} CELLS`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
