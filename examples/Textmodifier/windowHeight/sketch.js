/**
 * @title Textmodifier.windowHeight
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let winH = 0;

t.draw(() => {
	t.background(7, 9, 19);
	winH = t.windowHeight;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const ratio = t.constrain(winH / Math.max(1, t.displayHeight), 0.1, 1);
	const tideY = Math.round((ratio - 0.5) * (hh * 1.2));

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(x * 0.2 + t.frameCount * 0.05) * 2;
			const isWater = y >= tideY + wave;

			t.push();
			t.translate(x, y);

			if (isWater) {
				t.charColor(30, Math.floor(140 + ratio * 100), 240);
				t.cellColor(10, 25, 50);
				t.char(Math.abs(y - (tideY + wave)) < 1 ? '~' : '=');
			} else {
				t.charColor(20, 35, 60);
				t.cellColor(7, 9, 19);
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
	t.print('TEXTMODIFIER.WINDOWHEIGHT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: VIEWPORT HEIGHT TIDE GAUGE', x, y++);
	t.charColor(140, 160, 190);
	t.print('windowHeight reads window.innerHeight.', x, y++);
	t.print('Resize window height to shift tide baseline.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 180);
	t.print(`WINDOW HEIGHT: ${winH} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
