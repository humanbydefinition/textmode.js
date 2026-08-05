/**
 * @title TextmodeGrid.offsetY
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 4, 20);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const left = -Math.floor((cols - 1) / 2);
	const right = left + cols - 1;
	const top = -Math.floor(rows / 2);
	const bottom = top + rows - 1;
	const tm = t.frameCount * 0.04;

	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			const isBorder = x === left || x === right || y === top || y === bottom;
			const isCenter = x === 0 || y === 0;

			let charKey = '.';
			if (isBorder) charKey = '#';
			else if (isCenter) charKey = '+';
			else charKey = Math.cos(x * 0.2 + y * 0.2 + tm) > 0 ? '|' : ':';

			t.push();
			t.translate(x, y);
			t.charColor(
				isBorder ? 255 : isCenter ? 240 : 100,
				isBorder ? 180 : isCenter ? 120 : 140,
				isBorder ? 120 : isCenter ? 255 : 240
			);
			t.cellColor(isBorder ? 28 : 12, isBorder ? 14 : 8, isBorder ? 12 : 30);
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
	t.print('TEXTMODEGRID.OFFSETY', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: VERTICAL CENTERING ALIGNMENT', x, y++);
	t.charColor(140, 160, 190);
	t.print('Vertical offset in pixels from canvas', x, y++);
	t.print('edge to grid to center grid content.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`OFFSET Y: ${t.grid.offsetY} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
