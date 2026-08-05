/**
 * @title TextmodeGrid.height
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 12, 22);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const left = -Math.floor((cols - 1) / 2);
	const right = left + cols - 1;
	const top = -Math.floor(rows / 2);
	const bottom = top + rows - 1;
	const tm = t.frameCount * 0.05;

	for (let y = top; y <= bottom; y++) {
		const normY = (y - top) / Math.max(1, rows - 1);
		const pulse = Math.sin(normY * Math.PI * 4 - tm * 2) * 0.5 + 0.5;

		for (let x = left; x <= right; x++) {
			const isBorder = x === left || x === right || y === top || y === bottom;
			const isRuler = x === left + 1 || x === right - 1;

			let charKey = '.';
			if (isBorder) charKey = '#';
			else if (isRuler) charKey = (y - top) % 5 === 0 ? '+' : '|';
			else charKey = pulse > 0.6 ? '*' : ':';

			t.push();
			t.translate(x, y);
			t.charColor(
				isBorder ? 255 : isRuler ? 120 : Math.floor(40 + pulse * 140),
				isBorder ? 180 : isRuler ? 240 : Math.floor(100 + pulse * 100),
				isBorder ? 80 : isRuler ? 200 : Math.floor(180 + pulse * 75)
			);
			t.cellColor(
				isBorder ? 24 : Math.floor(6 + pulse * 10),
				isBorder ? 16 : Math.floor(10 + pulse * 12),
				isBorder ? 8 : Math.floor(20 + pulse * 16)
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
	t.print('TEXTMODEGRID.HEIGHT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: VERTICAL VIEWPORT BOUNDS RULER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Total grid height in screen pixels.', x, y++);
	t.print('Equal to rows * cellHeight.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TOTAL HEIGHT: ${t.grid.height} PX`, x, y++);
	t.print(`CALC: ${t.grid.rows} * ${t.grid.cellHeight} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
