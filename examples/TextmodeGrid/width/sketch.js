/**
 * @title TextmodeGrid.width
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(10, 14, 24);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const left = -Math.floor((cols - 1) / 2);
	const right = left + cols - 1;
	const top = -Math.floor(rows / 2);
	const bottom = top + rows - 1;
	const tm = t.frameCount * 0.05;

	for (let x = left; x <= right; x++) {
		const normX = (x - left) / Math.max(1, cols - 1);
		const pulse = Math.cos(normX * Math.PI * 4 - tm * 2) * 0.5 + 0.5;

		for (let y = top; y <= bottom; y++) {
			const isBorder = x === left || x === right || y === top || y === bottom;
			const isRuler = y === top + 1 || y === bottom - 1;

			let charKey = '.';
			if (isBorder) charKey = '#';
			else if (isRuler) charKey = (x - left) % 5 === 0 ? '+' : '-';
			else charKey = pulse > 0.6 ? '*' : ':';

			t.push();
			t.translate(x, y);
			t.charColor(
				isBorder ? 255 : isRuler ? 100 : Math.floor(60 + pulse * 140),
				isBorder ? 200 : isRuler ? 220 : Math.floor(140 + pulse * 100),
				isBorder ? 100 : isRuler ? 255 : Math.floor(120 + pulse * 80)
			);
			t.cellColor(
				isBorder ? 24 : Math.floor(8 + pulse * 10),
				isBorder ? 18 : Math.floor(14 + pulse * 12),
				isBorder ? 10 : Math.floor(24 + pulse * 14)
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
	t.print('TEXTMODEGRID.WIDTH', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: HORIZONTAL VIEWPORT BOUNDS RULER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Total grid width in screen pixels.', x, y++);
	t.print('Equal to cols * cellWidth.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TOTAL WIDTH: ${t.grid.width} PX`, x, y++);
	t.print(`CALC: ${t.grid.cols} * ${t.grid.cellWidth} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
