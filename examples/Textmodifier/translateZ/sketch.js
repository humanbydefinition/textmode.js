/**
 * @title Textmodifier.translateZ
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

	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			const dist = Math.hypot(x, y);
			const z = Math.sin(dist * 0.25 - tm * 3) * 16;
			const norm = (z + 16) / 32;

			const charKey = RAMP[Math.floor(norm * (RAMP.length - 1))];

			t.push();
			t.translateZ(z);
			t.translate(x, y);
			t.charColor(Math.floor(100 + norm * 155), Math.floor(220 - norm * 80), Math.floor(255 - norm * 120));
			t.cellColor(Math.floor(8 + norm * 16), Math.floor(20 + norm * 18), Math.floor(40 + norm * 20));
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
	t.print('TEXTMODIFIER.TRANSLATEZ', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: 3D HYPER-TUNNEL TRAVEL', x, y++);
	t.charColor(140, 160, 190);
	t.print('Translates origin along Z-axis (depth)', x, y++);
	t.print('demonstrating 3D perspective projection.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print('DISPLACEMENT: FULL-GRID Z-AXIS WARP', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
