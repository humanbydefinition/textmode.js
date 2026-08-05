/**
 * @title LayerManager.add
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';

const layer1 = t.layers.add({ blendMode: t.BLEND_SCREEN, opacity: 0.85 });
const layer2 = t.layers.add({ blendMode: t.BLEND_ADDITIVE, opacity: 0.75 });
const labelLayer = t.layers.add();

function drawField(fn, fg, bg, minV = 0.3) {
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	for (let y = -hh; y <= hh; y += 1) {
		for (let x = -hw; x <= hw; x += 1) {
			const v = fn(x, y);
			if (v > minV) {
				const idx = Math.min(RAMP.length - 1, Math.floor(((v - minV) / (1 - minV)) * RAMP.length));
				t.push();
				t.translate(x, y);
				t.charColor(fg[0], fg[1], fg[2]);
				t.cellColor(bg[0], bg[1], bg[2]);
				t.char(RAMP[idx]);
				t.point();
				t.pop();
			}
		}
	}
}

t.draw(() => {
	t.background(6, 10, 22);
	const tm = t.frameCount * 0.02;
	const f = (x, y) => (Math.sin(x * 0.08 + tm) + Math.cos(y * 0.1 + tm)) * 0.5 + 0.5;
	drawField(f, [40, 70, 110], [10, 16, 32], 0.4);
});

layer1.draw(() => {
	t.clear();
	const tm = t.frameCount * 0.03;
	const f = (x, y) => Math.sin(x * 0.1 + y * 0.08 + tm) * Math.cos(x * 0.08 - y * 0.12 + tm * 0.8);
	drawField(f, [240, 150, 40], [60, 30, 8], 0.25);
});

layer2.draw(() => {
	t.clear();
	const tm = t.frameCount * 0.04;
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const cx = Math.cos(tm) * (hw * 0.4);
	const cy = Math.sin(tm * 0.8) * (hh * 0.4);
	const f = (x, y) =>
		(Math.sin(Math.hypot(x - cx, y - cy) * 0.35 - tm * 1.5) +
			Math.sin(Math.hypot(x + cx, y + cy) * 0.35 - tm * 1.5)) *
		0.5;
	drawField(f, [40, 220, 200], [8, 50, 45], 0.3);
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
	t.print('LAYERMANAGER.ADD', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: GENERATIVE LAYERED FIELDS', x, y++);
	t.charColor(140, 160, 190);
	t.print('Adds user layers to composite fields.', x, y++);
	t.print('Layers blend screen & additive passes.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print('USER LAYERS ADDED: 2', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
