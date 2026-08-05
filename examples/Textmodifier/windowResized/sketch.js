/**
 * @title Textmodifier.windowResized
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let resizeCount = 0;

t.windowResized(() => {
	resizeCount++;
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

t.draw(() => {
	t.background(6, 10, 22);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	const aspect = t.windowWidth / Math.max(1, t.windowHeight);
	const scanAngle = t.frameCount * 0.04;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const normX = x / aspect;
			const dist = Math.hypot(normX, y);
			const angle = Math.atan2(y, normX);
			const isScan = Math.abs((angle - scanAngle) % (Math.PI * 2)) < 0.15 && dist < hh * 0.8;
			const isRing = Math.abs(dist - hh * 0.5) < 0.8;

			t.push();
			t.translate(x, y);

			if (isScan) {
				t.charColor(100, 255, 180);
				t.cellColor(15, 45, 30);
				t.char('#');
			} else if (isRing) {
				t.charColor(0, 200, 255);
				t.cellColor(10, 35, 55);
				t.char('=');
			} else {
				t.charColor(20, 40, 70);
				t.cellColor(6, 10, 22);
				t.char(x % 4 === 0 && y % 4 === 0 ? '+' : '.');
			}

			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 1;
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const aspect = (t.windowWidth / Math.max(1, t.windowHeight)).toFixed(2);

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.WINDOWRESIZED', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: VIEWPORT RESIZE TELEMETRY', x, y++);
	t.charColor(140, 160, 190);
	t.print('windowResized updates on window resize.', x, y++);
	t.print('Radar portal distorts to fit aspect ratio.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 200, 80);
	t.print(`RESIZE EVENTS: ${resizeCount}`, x, y++);
	t.charColor(140, 255, 200);
	t.print(`ASPECT RATIO: ${aspect}:1`, x, y++);
	t.pop();
});
