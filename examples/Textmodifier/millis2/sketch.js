/**
 * @title Textmodifier.millis2
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(10, 14, 22);
	const ms = t.millis;
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	const cycle1 = (ms % 1500) / 1500;
	const cycle2 = (ms % 3000) / 3000;

	const sonarRamp = '@%*+.';

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const isPulse1 = Math.abs(dist - cycle1 * 20) < 1.5;
			const isPulse2 = Math.abs(dist - cycle2 * 30) < 1.5;

			t.push();
			t.translate(x, y);

			if (isPulse1) {
				t.charColor(30, 220, 160);
				t.cellColor(12, 35, 25);
				t.char('@');
			} else if (isPulse2) {
				t.charColor(160, 255, 200);
				t.cellColor(15, 45, 30);
				t.char('*');
			} else {
				const terrain = (Math.sin(x * 0.2) + Math.cos(y * 0.2) + 2) / 4;
				const idx = Math.min(sonarRamp.length - 1, Math.floor(terrain * sonarRamp.length));
				t.charColor(20, 50, 40);
				t.cellColor(10, 14, 22);
				t.char(sonarRamp[idx]);
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
	t.print('TEXTMODIFIER.MILLIS2', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: MODULO MILLISECOND ECHOES', x, y++);
	t.charColor(140, 160, 190);
	t.print('millis % period drives sonar rings.', x, y++);
	t.print('Pulses sweep terrain contours live.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`MOD 1.5s: ${Math.floor(t.millis % 1500)} MS`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
