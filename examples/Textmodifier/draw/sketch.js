/**
 * @title Textmodifier.draw
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const RAMP = ' .:-=+*#%@';

t.draw(() => {
	t.background(10, 14, 30);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const scale1 = Math.sin(x * 0.08 + tm) + Math.cos(y * 0.08 + tm * 0.7);
			const scale2 = Math.sin(x * 0.18 - tm * 1.2) * Math.cos(y * 0.18 + tm * 0.9);
			const scale3 = Math.sin(Math.hypot(x, y) * 0.1 - tm * 1.5);
			const norm = (scale1 + scale2 + scale3 + 3) / 6;

			const idx = Math.min(RAMP.length - 1, Math.floor(norm * RAMP.length));

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(40 + norm * 215), Math.floor(180 - norm * 90), Math.floor(160 + norm * 95));
			t.cellColor(Math.floor(10 + norm * 30), Math.floor(14 + norm * 20), Math.floor(30 + norm * 40));
			t.char(RAMP[idx]);
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
	t.print('TEXTMODIFIER.DRAW', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: TURING MORPHOGENESIS SYNTHESIS', x, y++);
	t.charColor(140, 160, 190);
	t.print('draw() executes every frame at 60fps.', x, y++);
	t.print('Morphogenesis fields update live.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`FRAME: ${t.frameCount}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
