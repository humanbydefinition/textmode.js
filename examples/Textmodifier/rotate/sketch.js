/**
 * @title Textmodifier.rotate
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const RAMP = ' .:-=+*#%@';

t.draw(() => {
	t.background(6, 8, 20);
	const cols = t.grid.cols,
		rows = t.grid.rows;
	const left = -Math.floor((cols - 1) / 2),
		right = left + cols - 1;
	const top = -Math.floor(rows / 2),
		bottom = top + rows - 1;
	const tm = t.frameCount * 0.04;

	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			const dist = Math.hypot(x, y);
			const angle = Math.atan2(y, x);

			const wave = Math.sin(dist * 0.25 - tm * 2) * Math.cos(angle * 6 + tm);
			const norm = (wave + 1) * 0.5;

			const charKey = RAMP[Math.floor(norm * (RAMP.length - 1))];

			t.push();
			t.rotate(Math.sin(tm * 0.5) * 0.2);
			t.translate(x, y);
			t.charColor(Math.floor(80 + norm * 175), Math.floor(180 + norm * 75), Math.floor(255 - norm * 100));
			t.cellColor(Math.floor(6 + norm * 12), Math.floor(12 + norm * 14), Math.floor(28 + norm * 18));
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
	t.print('TEXTMODIFIER.ROTATE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: MOIRE SPIROGRAPH CITADEL', x, y++);
	t.charColor(140, 160, 190);
	t.print('Rotates current coordinate space', x, y++);
	t.print('by specified angle in 2D plane.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print('ROTATION: FULL-SCREEN HARMONIC MOIRE', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
