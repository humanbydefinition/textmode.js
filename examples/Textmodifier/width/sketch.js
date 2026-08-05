/**
 * @title Textmodifier.width
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

	const waveFreq = (t.width / 1000) * 0.15;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const waveY = Math.round(Math.sin(x * waveFreq + t.frameCount * 0.04) * 4);
			const isSignal = y === waveY;

			t.push();
			t.translate(x, y);

			if (isSignal) {
				t.charColor(255, 200, 80);
				t.cellColor(45, 30, 10);
				t.char(x > 0 ? '>' : '<');
			} else if (y === 0) {
				t.charColor(60, 100, 160);
				t.cellColor(6, 10, 22);
				t.char('=');
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
	t.print('TEXTMODIFIER.WIDTH', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: CANVAS PIXEL WIDTH', x, y++);
	t.charColor(140, 160, 190);
	t.print('t.width reads canvas width in px.', x, y++);
	t.print('Signal pulse frequency spans width.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 180);
	t.print(`CANVAS WIDTH: ${t.width} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
