/**
 * @title TextmodeGrid.cellHeight
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 12, 20);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const hw = Math.floor(cols / 2);
	const hh = Math.floor(rows / 2);
	const tm = t.frameCount * 0.05;
	const cH = t.grid.cellHeight;

	for (let y = -hh; y <= hh; y++) {
		const isStride = Math.abs(y) % Math.floor(cH / 4 || 1) === 0;
		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(x * 0.15 + y * (cH * 0.02) + tm);
			const norm = (wave + 1) * 0.5;

			const charKey = isStride ? '=' : norm > 0.6 ? '#' : norm > 0.3 ? '+' : '.';

			t.push();
			t.translate(x, y);
			t.charColor(
				isStride ? 255 : Math.floor(40 + norm * 180),
				isStride ? 220 : Math.floor(140 + norm * 110),
				isStride ? 100 : Math.floor(240 - norm * 80)
			);
			t.cellColor(
				isStride ? 24 : Math.floor(6 + norm * 12),
				isStride ? 16 : Math.floor(10 + norm * 14),
				isStride ? 8 : Math.floor(20 + norm * 18)
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

	const aspect = (t.grid.cellWidth / (t.grid.cellHeight || 1)).toFixed(2);

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEGRID.CELLHEIGHT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: VERTICAL ASPECT STRIDE SCANNER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Height of each cell in screen pixels.', x, y++);
	t.print('Dictates vertical step stride.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`CELL HEIGHT: ${t.grid.cellHeight} PX`, x, y++);
	t.print(`CELL ASPECT: ${aspect}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
