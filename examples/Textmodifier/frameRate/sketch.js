/**
 * @title Textmodifier.frameRate
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let measuredFPS = 60;
let targetFPS = 60;

t.draw(() => {
	t.background(8, 10, 14);
	targetFPS = Math.floor(t.frameCount / 180) % 2 === 0 ? 60 : 30;
	t.frameRate(targetFPS);
	measuredFPS = t.frameRate();

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const scanlineY = Math.floor((t.frameCount * 0.5) % (hh * 2)) - hh;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const isScanline = y === scanlineY;
			const isBar = y === 5 && x >= -18 && x < -18 + Math.round(measuredFPS / 2);

			t.push();
			t.translate(x, y);

			if (isScanline) {
				t.charColor(60, 240, 120);
				t.cellColor(15, 45, 25);
				t.char('=');
			} else if (isBar) {
				t.charColor(255, 160, 40);
				t.cellColor(40, 25, 10);
				t.char('#');
			} else {
				t.charColor(20, 40, 30);
				t.cellColor(8, 10, 14);
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
	t.print('TEXTMODIFIER.FRAMERATE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: CRT PHOSPHOR CADENCE', x, y++);
	t.charColor(140, 160, 190);
	t.print('Target FPS alternates between 60 & 30.', x, y++);
	t.print('Measured FPS updates phosphor bar.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TARGET: ${targetFPS} FPS | REAL: ${measuredFPS.toFixed(1)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
