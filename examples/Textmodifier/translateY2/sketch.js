/**
 * @title Textmodifier.translateY2
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

	for (let x = left; x <= right; x++) {
		const dropY = ((tm * 12 + Math.sin(x * 0.4) * 15) % rows) - Math.floor(rows / 2);

		for (let y = top; y <= bottom; y++) {
			const distToHead = Math.abs(y - dropY);
			const norm = Math.max(0, 1 - distToHead / 8);

			const charKey = RAMP[Math.floor(norm * (RAMP.length - 1))];

			t.push();
			t.translate(x, 0);
			t.translateY(dropY * 0.1);
			t.translate(0, y);
			t.charColor(Math.floor(60 + norm * 195), Math.floor(220 + norm * 35), Math.floor(180 - norm * 80));
			t.cellColor(Math.floor(4 + norm * 12), Math.floor(16 + norm * 20), Math.floor(24 + norm * 16));
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
	t.print('TEXTMODIFIER.TRANSLATEY2', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: DIGITAL RAIN WATERFALL CASCADE', x, y++);
	t.charColor(140, 160, 190);
	t.print('Vertical offset streams cascading', x, y++);
	t.print('downwards through coordinate space.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print('DISPLACEMENT: CONTINUOUS Y RAIN STREAM', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
