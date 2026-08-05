/**
 * @title TextmodeGrid.creation
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 12, 26);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const hw = Math.floor(cols / 2);
	const hh = Math.floor(rows / 2);
	const tm = t.frameCount * 0.04;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const isOrigin = x === 0 && y === 0;
			const isAxis = x === 0 || y === 0;
			const dist = Math.hypot(x, y);
			const wave = Math.sin(dist * 0.3 - tm * 2) * 0.5 + 0.5;

			let charKey = '.';
			if (isOrigin) charKey = '@';
			else if (isAxis) charKey = x === 0 ? '|' : '-';
			else charKey = wave > 0.6 ? '+' : ':';

			t.push();
			t.translate(x, y);
			t.charColor(
				isOrigin ? 255 : isAxis ? 100 : Math.floor(50 + wave * 150),
				isOrigin ? 220 : isAxis ? 240 : Math.floor(120 + wave * 100),
				isOrigin ? 80 : isAxis ? 255 : Math.floor(180 + wave * 75)
			);
			t.cellColor(
				isOrigin ? 40 : isAxis ? 14 : Math.floor(6 + wave * 8),
				isOrigin ? 28 : isAxis ? 20 : Math.floor(10 + wave * 12),
				isOrigin ? 12 : isAxis ? 32 : Math.floor(20 + wave * 14)
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

	const totalCells = t.grid.cols * t.grid.rows;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEGRID.CREATION', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ARCHITECTURE MATRIX BLUEPRINT', x, y++);
	t.charColor(140, 160, 190);
	t.print('Grid layout determines character positioning', x, y++);
	t.print('and center-based origin coordinates.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`GRID DIMENSIONS: ${t.grid.cols} X ${t.grid.rows}`, x, y++);
	t.print(`TOTAL CELL COUNT: ${totalCells} CELLS`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
