/**
 * @title Textmodifier.translateX
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
	const tm = t.frameCount * 0.05;

	for (let y = top; y <= bottom; y++) {
		const shiftX = Math.sin(tm * 1.8 + y * 0.2) * 8;

		for (let x = left; x <= right; x++) {
			const wave = Math.sin((x + shiftX) * 0.25 + tm);
			const norm = (wave + 1) * 0.5;

			const charKey = RAMP[Math.floor(norm * (RAMP.length - 1))];

			t.push();
			t.translate(0, y);
			t.translateX(shiftX);
			t.translate(x, 0);
			t.charColor(Math.floor(100 + norm * 155), Math.floor(220 - norm * 60), Math.floor(255 - norm * 100));
			t.cellColor(Math.floor(8 + norm * 14), Math.floor(24 + norm * 16), Math.floor(40 + norm * 20));
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
	t.print('TEXTMODIFIER.TRANSLATEX', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: HORIZONTAL SINE WAVE MATRIX', x, y++);
	t.charColor(140, 160, 190);
	t.print('Shifts origin along X-axis independently', x, y++);
	t.print('without affecting Y or Z coordinates.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print('DISPLACEMENT: FULL-SCREEN X-AXIS WAVE', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
