/**
 * @title Textmodifier.displayHeight
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let displayH = 0;
let ratio = 0;

t.draw(() => {
	t.background(8, 9, 20);
	displayH = t.displayHeight;
	ratio = t.windowHeight / Math.max(1, displayH);

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const baroRamp = '@#*+.';

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const normY = (y + hh) / Math.max(1, hh * 2);
			const pressWave = Math.sin(normY * 12 - t.frameCount * 0.05) * 0.5 + 0.5;
			const idx = Math.min(baroRamp.length - 1, Math.floor(pressWave * baroRamp.length));

			t.push();
			t.translate(x, y);

			if (Math.abs(x) < 4) {
				t.charColor(Math.floor(60 + pressWave * 195), Math.floor(140 + pressWave * 100), 240);
				t.cellColor(15, 25, 45);
				t.char(baroRamp[idx]);
			} else {
				t.charColor(30, 45, 75);
				t.cellColor(8, 9, 20);
				t.char(y % 4 === 0 ? '-' : '.');
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
	t.print('TEXTMODIFIER.DISPLAYHEIGHT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: SCREEN HEIGHT METRICS', x, y++);
	t.charColor(140, 160, 190);
	t.print('displayHeight reads total screen height.', x, y++);
	t.print('Barometric column pressure updates live.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 200, 100);
	t.print(`DISPLAY HEIGHT: ${displayH} PX`, x, y++);
	t.charColor(140, 255, 180);
	t.print(`WINDOW RATIO: ${(ratio * 100).toFixed(0)}%`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
