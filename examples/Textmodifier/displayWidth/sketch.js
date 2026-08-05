/**
 * @title Textmodifier.displayWidth
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let displayW = 0;
let ratio = 0;

t.draw(() => {
	t.background(7, 10, 18);
	displayW = t.displayWidth;
	ratio = t.windowWidth / Math.max(1, displayW);

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const freqScale = displayW * 0.0001;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const waveY = Math.round(Math.sin(x * freqScale * 10 + t.frameCount * 0.04) * (hh * 0.4));
			const isWave = y === waveY;
			const isCenter = y === 0;

			t.push();
			t.translate(x, y);

			if (isWave) {
				t.charColor(100, 255, 180);
				t.cellColor(15, 45, 30);
				t.char('=');
			} else if (isCenter) {
				t.charColor(40, 70, 100);
				t.cellColor(7, 10, 18);
				t.char('-');
			} else {
				t.charColor(25, 40, 60);
				t.cellColor(7, 10, 18);
				t.char(x % 10 === 0 ? ':' : '.');
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
	t.print('TEXTMODIFIER.DISPLAYWIDTH', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: SCREEN WIDTH METRICS', x, y++);
	t.charColor(140, 160, 190);
	t.print('displayWidth reads total screen width.', x, y++);
	t.print('Oscilloscope wavelength scales with displayW.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 200, 100);
	t.print(`DISPLAY WIDTH: ${displayW} PX`, x, y++);
	t.charColor(140, 255, 180);
	t.print(`WINDOW RATIO: ${(ratio * 100).toFixed(0)}%`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
