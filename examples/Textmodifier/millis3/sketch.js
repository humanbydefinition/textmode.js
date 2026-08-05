/**
 * @title Textmodifier.millis3
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.keyPressed((data) => {
	if (data.key === ' ') t.millis = 0;
});

t.draw(() => {
	t.background(6, 8, 14);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	const charge = Math.min(1, t.millis / 3000);
	const coreRadius = charge * 14;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);

			t.push();
			t.translate(x, y);

			if (dist <= coreRadius) {
				t.charColor(0, Math.floor(200 + charge * 55), Math.floor(180 + charge * 40));
				t.cellColor(10, Math.floor(25 + charge * 30), 40);
				t.char(dist < coreRadius * 0.5 ? '#' : '*');
			} else {
				t.charColor(30, 40, 60);
				t.cellColor(6, 8, 14);
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

	const pct = Math.min(100, Math.floor((t.millis / 3000) * 100));

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.MILLIS3', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: WRITABLE MILLISECOND RESET', x, y++);
	t.charColor(140, 160, 190);
	t.print('Press SPACE to set t.millis = 0.', x, y++);
	t.print('Reactor core charge collapses to 0%.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(0, 240, 220);
	t.print(`CORE CHARGE: ${pct}% (${Math.floor(t.millis)} MS)`, x, y++);
	t.charColor(255, 220, 100);
	t.print('PRESS SPACE TO COLLAPSE CORE', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
