/**
 * @title TextmodeLayer.hide
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const signalLayer = t.layers.add({ blendMode: t.BLEND_ADDITIVE });
const labelLayer = t.layers.add();
let isVisible = true;

t.draw(() => {
	t.background(6, 10, 22);

	if (t.frameCount % 120 === 0) {
		if (isVisible) {
			signalLayer.hide();
		} else {
			signalLayer.show();
		}
		isVisible = !isVisible;
	}

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	t.push();
	t.charColor(30, 45, 75);
	t.char('+');
	for (let y = -hh; y <= hh; y += 6) {
		for (let x = -hw; x <= hw; x += 10) {
			t.push();
			t.translate(x, y);
			t.point();
			t.pop();
		}
	}
	t.pop();
});

signalLayer.draw(() => {
	t.clear();
	const tm = t.frameCount * 0.04;
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	const trail = ['*', 'o', '.', ':'];
	for (let i = 0; i < 16; i++) {
		const angle = tm - i * 0.08;
		const r = Math.min(hw, hh) * 0.5;
		const px = Math.floor(Math.cos(angle) * r);
		const py = Math.floor(Math.sin(angle) * (r * 0.6));
		const idx = Math.min(trail.length - 1, Math.floor((i / 16) * trail.length));

		t.push();
		t.translate(px, py);
		t.charColor(Math.floor(255 - i * 12), Math.floor(200 - i * 10), Math.floor(60 + i * 10));
		t.cellColor(30, 20, 5);
		t.char(trail[idx]);
		t.point();
		t.pop();
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
	t.print('TEXTMODELAYER.HIDE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: CONTINUOUS RADAR STATE MASKING', x, y++);
	t.charColor(140, 160, 190);
	t.print('hide() pauses layer composition.', x, y++);
	t.print('Background particle state advances.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	if (isVisible) {
		t.charColor(140, 255, 180);
		t.print('STATUS: VISIBLE (SIGNAL ON)', x, y++);
	} else {
		t.charColor(255, 120, 120);
		t.print('STATUS: HIDDEN (STATE CONTINUES)', x, y++);
	}
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
