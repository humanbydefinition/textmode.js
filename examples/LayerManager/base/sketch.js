/**
 * @title LayerManager.base
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const base = t.layers.base;
const overlay = t.layers.add({ blendMode: t.BLEND_SCREEN, opacity: 0.85 });
const labelLayer = t.layers.add();

base.draw(() => {
	t.background(16, 8, 14);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const time = t.frameCount * 0.03;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const v = Math.abs(Math.sin(x * 0.22) + Math.cos(y * 0.22) + Math.sin((x + y) * 0.08 + time));
			if (v > 0.4) {
				const norm = Math.min(1, (v - 0.4) / 1.4);
				const idx = Math.floor(norm * (RAMP.length - 1));
				t.push();
				t.translate(x, y);
				t.charColor(240, 130 + idx * 10, 50);
				t.cellColor(28, 12, 22);
				t.char(RAMP[idx]);
				t.point();
				t.pop();
			}
		}
	}
});

overlay.draw(() => {
	t.clear();
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const angle = t.frameCount * 0.025;
	const cosA = Math.cos(angle);
	const sinA = Math.sin(angle);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const d = Math.abs(-sinA * x + cosA * y);
			if (d < 1.5) {
				const intensity = 1 - d / 1.5;
				const idx = Math.floor(intensity * (RAMP.length - 1));
				t.push();
				t.translate(x, y);
				t.charColor(40, 240, 160);
				t.cellColor(8, 45, 30);
				t.char(RAMP[idx]);
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

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('LAYERMANAGER.BASE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ACCESSING BASE LAYER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Accesses base layer via t.layers.base.', x, y++);
	t.print('Base layer draws below user overlays.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print('BASE LAYER ACTIVE: YES', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
