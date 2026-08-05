/**
 * @title TextmodeFont.framebuffer
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(10, 8, 16);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;

	const scanX = Math.sin(tm) * hw;
	const scanY = Math.cos(tm * 0.7) * hh;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dBeam1 = Math.abs(x - scanX);
			const dBeam2 = Math.abs(y - scanY);
			const field = Math.exp(-dBeam1 * 0.2) + Math.exp(-dBeam2 * 0.2);
			const norm = Math.min(1, field * 0.5);

			const idx = Math.floor(norm * (RAMP.length - 1));
			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(40 + norm * 200), Math.floor(160 + norm * 95), Math.floor(240 - norm * 80));
			t.cellColor(Math.floor(10 + norm * 15), Math.floor(12 + norm * 20), Math.floor(28 + norm * 25));
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

	const fb = t.font.framebuffer;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEFONT.FRAMEBUFFER', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ATLAS TEXTURE FRAMEBUFFER', x, y++);
	t.charColor(140, 160, 190);
	t.print('GLFramebuffer storing glyph atlas.', x, y++);
	t.print('Sampled by WebGL ASCII resolve pass.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	if (fb) {
		t.print(`ATLAS DIMS: ${fb.width}x${fb.height} PX`, x, y++);
	} else {
		t.print('ATLAS INITIALIZING...', x, y++);
	}
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
