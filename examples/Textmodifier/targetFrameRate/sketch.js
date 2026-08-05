/**
 * @title Textmodifier.targetFrameRate
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let targetFPS = 60;

t.draw(() => {
	t.background(16, 10, 24);
	targetFPS = Math.floor(t.frameCount / 150) % 2 === 0 ? 15 : 60;
	t.targetFrameRate(targetFPS);

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const waveY = Math.round(Math.sin(x * 0.2 + tm) * 6);
			const isPendulum = y === waveY;

			t.push();
			t.translate(x, y);

			if (isPendulum) {
				t.charColor(0, 220, 255);
				t.cellColor(10, 40, 55);
				t.char('O');
			} else {
				t.charColor(50, 30, 70);
				t.cellColor(16, 10, 24);
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
	t.print('TEXTMODIFIER.TARGETFRAMERATE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: STROBOSCOPIC STAGE CADENCE', x, y++);
	t.charColor(140, 160, 190);
	t.print('Toggles between 15 (film) & 60 FPS.', x, y++);
	t.print('Motion steps adapt to target cadence.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 60, 180);
	t.print(`TARGET CADENCE: ${targetFPS} FPS`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
