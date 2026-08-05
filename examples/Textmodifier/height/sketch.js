/**
 * @title Textmodifier.height
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

	const flowSpeed = (t.height / 500) * 0.1;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const fall = (y * 0.15 + t.frameCount * flowSpeed) % 1;
			const isStream = Math.abs(x - Math.sin(y * 0.1 + t.frameCount * 0.03) * 6) < 2;

			t.push();
			t.translate(x, y);

			if (isStream) {
				t.charColor(40, 200, 255);
				t.cellColor(10, 35, 55);
				t.char(fall > 0.5 ? '/' : '|');
			} else if (y > hh - 2) {
				t.charColor(100, 220, 255);
				t.cellColor(20, 45, 65);
				t.char('~');
			} else {
				t.charColor(20, 40, 70);
				t.cellColor(6, 10, 22);
				t.char('.');
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
	t.print('TEXTMODIFIER.HEIGHT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: CANVAS PIXEL HEIGHT', x, y++);
	t.charColor(140, 160, 190);
	t.print('t.height reads canvas height in px.', x, y++);
	t.print('Waterfall flow speed scales with height.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 180);
	t.print(`CANVAS HEIGHT: ${t.height} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
