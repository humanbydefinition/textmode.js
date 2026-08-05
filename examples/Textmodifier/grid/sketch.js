/**
 * @title Textmodifier.grid
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 22);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const pulse = Math.sin(t.frameCount * 0.05) * 3;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const isMajorCol = (x + hw + Math.round(pulse)) % 8 === 0;
			const isMajorRow = (y + hh + Math.round(pulse)) % 4 === 0;
			const isIntersection = isMajorCol && isMajorRow;

			t.push();
			t.translate(x, y);

			if (isIntersection) {
				t.charColor(100, 255, 180);
				t.cellColor(20, 55, 40);
				t.char('+');
			} else if (isMajorCol) {
				t.charColor(50, 100, 160);
				t.cellColor(10, 20, 38);
				t.char('|');
			} else if (isMajorRow) {
				t.charColor(50, 100, 160);
				t.cellColor(10, 20, 38);
				t.char('-');
			} else {
				t.charColor(25, 40, 70);
				t.cellColor(6, 10, 22);
				t.char(x % 2 === 0 && y % 2 === 0 ? ':' : '.');
			}

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
	t.print('TEXTMODIFIER.GRID', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: DYNAMIC GRID METRICS', x, y++);
	t.charColor(140, 160, 190);
	t.print('t.grid exposes cols, rows, and cells.', x, y++);
	t.print('Grid dimensions adapt to window size.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 180);
	t.print(`COLUMNS: ${t.grid.cols}`, x, y++);
	t.print(`ROWS: ${t.grid.rows}`, x, y++);
	t.charColor(255, 200, 100);
	t.print(`TOTAL CELLS: ${t.grid.cols * t.grid.rows}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
