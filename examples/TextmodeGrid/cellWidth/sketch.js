/**
 * @title TextmodeGrid.cellWidth
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(8, 14, 24);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const hw = Math.floor(cols / 2);
	const hh = Math.floor(rows / 2);
	const tm = t.frameCount * 0.05;
	const cW = t.grid.cellWidth;

	for (let x = -hw; x <= hw; x++) {
		const isStride = Math.abs(x) % Math.floor(cW / 3 || 1) === 0;
		for (let y = -hh; y <= hh; y++) {
			const wave = Math.cos(y * 0.15 + x * (cW * 0.03) + tm);
			const norm = (wave + 1) * 0.5;

			const charKey = isStride ? '|' : norm > 0.6 ? '*' : norm > 0.3 ? ':' : '.';

			t.push();
			t.translate(x, y);
			t.charColor(
				isStride ? 100 : Math.floor(60 + norm * 180),
				isStride ? 240 : Math.floor(180 + norm * 70),
				isStride ? 255 : Math.floor(120 + norm * 130)
			);
			t.cellColor(
				isStride ? 8 : Math.floor(8 + norm * 10),
				isStride ? 24 : Math.floor(12 + norm * 16),
				isStride ? 32 : Math.floor(22 + norm * 14)
			);
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
	t.print('TEXTMODEGRID.CELLWIDTH', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: HORIZONTAL COLUMN STRIDE MATRIX', x, y++);
	t.charColor(140, 160, 190);
	t.print('Width of each cell in screen pixels.', x, y++);
	t.print('Dictates column horizontal density.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`CELL WIDTH: ${t.grid.cellWidth} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
