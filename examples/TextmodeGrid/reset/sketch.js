/**
 * @title TextmodeGrid.reset
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let resetPulse = 0;

t.setup(() => {});

t.mousePressed(() => {
	t.grid.reset();
	resetPulse = 1.0;
});

t.draw(() => {
	t.background(6, 12, 24);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const left = -Math.floor((cols - 1) / 2);
	const right = left + cols - 1;
	const top = -Math.floor(rows / 2);
	const bottom = top + rows - 1;
	const tm = t.frameCount * 0.05;

	if (resetPulse > 0) resetPulse -= 0.03;

	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			const dist = Math.hypot(x, y);
			const wave = Math.sin(dist * 0.4 - tm * 3 + resetPulse * 6);
			const norm = (wave + 1) * 0.5;

			const charKey = resetPulse > 0.5 ? '#' : norm > 0.6 ? '+' : norm > 0.3 ? ':' : '.';

			t.push();
			t.translate(x, y);
			t.charColor(
				resetPulse > 0 ? 255 : Math.floor(60 + norm * 180),
				resetPulse > 0 ? Math.floor(180 + resetPulse * 75) : Math.floor(140 + norm * 110),
				resetPulse > 0 ? Math.floor(100 + resetPulse * 155) : Math.floor(220 - norm * 80)
			);
			t.cellColor(Math.floor(8 + norm * 12), Math.floor(12 + norm * 14), Math.floor(24 + norm * 16));
			t.char(charKey);
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
	t.print('TEXTMODEGRID.RESET', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: INTERACTIVE GRID RECALCULATION', x, y++);
	t.charColor(140, 160, 190);
	t.print('Recalculates columns and rows from', x, y++);
	t.print('current canvas & cell dimensions.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`GRID: ${t.grid.cols} X ${t.grid.rows}`, x, y++);
	t.charColor(255, 200, 100);
	t.print('CLICK CANVAS TO TRIGGER RESET()', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
