/**
 * @title Textmodifier.scale
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const RAMP = ' .:-=+*#%@';

t.draw(() => {
	t.background(6, 10, 24);
	const cols = t.grid.cols,
		rows = t.grid.rows;
	const left = -Math.floor((cols - 1) / 2),
		right = left + cols - 1;
	const top = -Math.floor(rows / 2),
		bottom = top + rows - 1;
	const tm = t.frameCount * 0.04;

	const sx = 1 + Math.sin(tm * 1.5) * 0.4;
	const sy = 1 + Math.cos(tm * 1.2) * 0.4;

	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			const dist = Math.hypot(x, y);
			const wave = Math.sin(dist * 0.25 - tm * 2) * Math.cos(x * 0.15 + y * 0.15);
			const norm = (wave + 1) * 0.5;

			const charKey = RAMP[Math.floor(norm * (RAMP.length - 1))];

			t.push();
			t.scale(sx, sy, 1.0);
			t.translate(x, y);
			t.charColor(255, Math.floor(140 + sx * 60), Math.floor(100 + sy * 80));
			t.cellColor(Math.floor(8 + norm * 14), Math.floor(12 + norm * 16), Math.floor(28 + norm * 20));
			t.char(charKey);
			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3,
		x = left + 3;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.SCALE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: BREATHING CATHEDRAL LATTICE', x, y++);
	t.charColor(140, 160, 190);
	t.print('Scales current matrix by scale factors', x, y++);
	t.print('along X, Y, and Z coordinate axes.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print('TRANSFORM: NON-UNIFORM KINETIC SCALE', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
