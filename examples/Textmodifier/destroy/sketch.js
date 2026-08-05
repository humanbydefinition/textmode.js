/**
 * @title Textmodifier.destroy
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let teardownY = -999;

t.mouseClicked(() => {
	if (teardownY === -999) {
		teardownY = -Math.floor(t.grid.rows / 2);
	}
});

t.draw(() => {
	t.background(8, 6, 12);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03;

	if (teardownY !== -999) {
		teardownY += 0.8;
	}

	const buildRamp = '#%=|+/:-.';
	const decayRamp = 'X!x:.';

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const isoVal = Math.sin(x * 0.2 + y * 0.15 + tm) * Math.cos(x * 0.15 - y * 0.2 + tm);
			const norm = (isoVal + 1) * 0.5;

			t.push();
			t.translate(x, y);

			if (teardownY !== -999 && y <= teardownY) {
				const d = Math.floor(teardownY - y);
				const decayIdx = Math.min(decayRamp.length - 1, d);
				t.charColor(255, Math.max(30, 140 - d * 25), 60);
				t.cellColor(18, 6, 10);
				t.char(decayRamp[decayIdx]);
			} else {
				const idx = Math.floor(norm * (buildRamp.length - 1));
				t.charColor(Math.floor(30 + norm * 120), Math.floor(80 + norm * 140), Math.floor(140 + norm * 110));
				t.cellColor(10, 8, 18);
				t.char(buildRamp[idx]);
			}

			t.point();
			t.pop();
		}
	}

	if (teardownY !== -999 && teardownY > hh + 2) {
		t.destroy();
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
	t.print('TEXTMODIFIER.DESTROY', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: MONOLITHIC DEFRAG TEARDOWN', x, y++);
	t.charColor(140, 160, 190);
	t.print('Click initiates vertical defrag sweep.', x, y++);
	t.print('t.destroy() disposes GPU resources.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	if (teardownY !== -999) {
		t.charColor(255, 90, 90);
		t.print('STATE: DEFRAG TEARDOWN IN PROGRESS', x, y++);
	} else {
		t.charColor(140, 255, 180);
		t.print('STATE: ACTIVE (CLICK TO TEARDOWN)', x, y++);
	}
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
