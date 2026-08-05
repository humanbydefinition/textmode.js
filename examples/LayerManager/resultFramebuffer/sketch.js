/**
 * @title LayerManager.resultFramebuffer
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const waveLayer = t.layers.add({ blendMode: t.BLEND_SCREEN });
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(5, 10, 24);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;

	const lissX = Math.sin(tm * 1.3) * (hw * 0.6);
	const lissY = Math.cos(tm * 0.9) * (hh * 0.6);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x - lissX, y - lissY);
			const wave = (Math.sin(dist * 0.35 - tm * 2) + 1) * 0.5;

			if (wave > 0.5) {
				const idx = Math.floor(((wave - 0.5) / 0.5) * (RAMP.length - 1));
				t.push();
				t.translate(x, y);
				t.charColor(0, Math.floor(120 + wave * 135), 245);
				t.cellColor(2, 12, 35);
				t.char(RAMP[idx]);
				t.point();
				t.pop();
			}
		}
	}
});

waveLayer.draw(() => {
	t.clear();
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03;

	for (let y = -hh; y <= hh; y += 2) {
		for (let x = -hw; x <= hw; x += 2) {
			const gridHarmonic = Math.sin(x * 0.2 + tm) * Math.cos(y * 0.2 - tm);
			if (gridHarmonic > 0.4) {
				t.push();
				t.translate(x, y);
				t.charColor(255, 130, 40);
				t.char('+');
				t.point();
				t.pop();
			}
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const fb = t.layers.resultFramebuffer;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('LAYERMANAGER.RESULTFRAMEBUFFER', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: OSCILLOSCOPE FEEDBACK LENS', x, y++);
	t.charColor(140, 160, 190);
	t.print('Inspects composited WebGL framebuffer.', x, y++);
	t.print('Reads pixel render target bounds.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	if (fb) {
		t.charColor(255, 180, 40);
		t.print(`FB BOUNDS: ${fb.width}x${fb.height} PX`, x, y++);
	}
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
