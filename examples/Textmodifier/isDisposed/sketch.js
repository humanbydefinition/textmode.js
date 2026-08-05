/**
 * @title Textmodifier.isDisposed
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.mouseClicked(() => {
	if (!t.isDisposed) {
		t.destroy();
	}
});

t.draw(() => {
	t.background(6, 8, 16);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.08;

	const pulseSignal = Math.sin(tm * 2) * Math.exp(-((tm % Math.PI) * 2));

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const waveY = Math.round(Math.sin(x * 0.15 + tm) * 4 + pulseSignal * 5);
			const isSignal = Math.abs(y - waveY) <= 1;

			t.push();
			t.translate(x, y);

			if (isSignal) {
				t.charColor(0, 240, 220);
				t.cellColor(10, 35, 45);
				t.char(y === waveY ? '=' : '~');
			} else {
				t.charColor(30, 50, 80);
				t.cellColor(6, 8, 16);
				t.char(y === 0 || x === 0 ? '+' : '.');
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

	const disposed = t.isDisposed;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.ISDISPOSED', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: BIOMETRIC TELEMETRY FLAG', x, y++);
	t.charColor(140, 160, 190);
	t.print('Click calls destroy() to dispose.', x, y++);
	t.print('isDisposed reports instance state.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	if (disposed) {
		t.charColor(255, 90, 90);
		t.print('ISDISPOSED: TRUE (DISPOSED STASIS)', x, y++);
	} else {
		t.charColor(140, 255, 180);
		t.print('ISDISPOSED: FALSE (CLICK TO DISPOSE)', x, y++);
	}
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
