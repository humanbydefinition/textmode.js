/**
 * @title Textmode.creation
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const RAMP = ' .:+*#@';

t.draw(() => {
	t.background(14, 6, 26);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.02;

	const n = 3 + Math.sin(tm * 0.5) * 1.5;
	const m = 2 + Math.cos(tm * 0.7) * 1.5;

	for (let y = -hh; y <= hh; y++) {
		const ny = (y / hh) * Math.PI;
		for (let x = -hw; x <= hw; x++) {
			const nx = (x / hw) * Math.PI;

			const chladni = Math.sin(n * nx) * Math.cos(m * ny) - Math.cos(m * nx) * Math.sin(n * ny);
			const absVal = Math.abs(chladni);

			if (absVal < 0.6) {
				const norm = 1 - absVal / 0.6;
				const idx = Math.floor(norm * (RAMP.length - 1));

				t.push();
				t.translate(x, y);
				t.charColor(Math.floor(180 + norm * 75), Math.floor(140 + norm * 70), Math.floor(40 + norm * 50));
				t.cellColor(Math.floor(25 + norm * 20), 8, Math.floor(40 + norm * 20));
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
	t.print('TEXTMODE.CREATION', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: CHLADNI NODAL RESONANCE', x, y++);
	t.charColor(140, 160, 190);
	t.print('Factory initialization setup.', x, y++);
	t.print('Configures canvas & grid context.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 210, 90);
	t.print('RESONANCE: ACTIVE', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
