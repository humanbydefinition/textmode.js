/**
 * @title TextmodeLayer.show
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const coreLayer = t.layers.add({ visible: false, blendMode: t.BLEND_ADDITIVE });
const labelLayer = t.layers.add();
let lastAction = -90;

const toggle = () => {
	if (coreLayer.isVisible()) coreLayer.hide();
	else coreLayer.show();
	lastAction = t.frameCount;
};

t.mouseClicked(toggle);

t.draw(() => {
	t.background(16, 6, 10);
	if (t.frameCount - lastAction >= 90) toggle();

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const time = t.frameCount * 0.03;

	t.push();
	t.charColor(55, 25, 35);
	for (let y = -hh + (hh % 4); y <= hh; y += 4) {
		for (let x = -hw + (hw % 8); x <= hw; x += 8) {
			t.print('+', x, y);
		}
	}

	t.charColor(70, 30, 40);
	[6, 12, 18].forEach((r, idx) => {
		const steps = Math.floor(r * 3.5);
		for (let i = 0; i < steps; i++) {
			const angle = (i / steps) * Math.PI * 2 + time * (idx % 2 === 0 ? 0.5 : -0.5);
			const rx = Math.floor(Math.cos(angle) * r * 1.5);
			const ry = Math.floor(Math.sin(angle) * r * 0.7);
			t.print('.', rx, ry);
		}
	});
	t.pop();
});

coreLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.05;
	const mx = isFinite(t.mouse.x) ? t.mouse.x : Math.sin(time) * 8;
	const my = isFinite(t.mouse.y) ? t.mouse.y : Math.cos(time * 0.8) * 4;

	t.push();
	const petals = 12;
	for (let p = 0; p < petals; p++) {
		const angle = (p / petals) * Math.PI * 2 + time;
		for (let d = 2; d <= 14; d += 2) {
			const px = Math.floor(mx + Math.cos(angle) * d * 1.4);
			const py = Math.floor(my + Math.sin(angle) * d * 0.7);
			const norm = 1 - d / 14;
			t.charColor(255, Math.floor(85 + norm * 110), Math.floor(70 + norm * 145));
			t.cellColor(Math.floor(35 * norm), Math.floor(15 * norm), 5);
			t.print(norm > 0.7 ? '#' : norm > 0.4 ? '*' : '+', px, py);
		}
	}
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	const active = coreLayer.isVisible();

	t.push();
	t.printAlign('left', 'top');
	t.cellColor(16, 6, 10, 220);
	t.charColor(255, 85, 70);
	t.print('TEXTMODELAYER.SHOW', left, top);
	t.charColor(100, 40, 50);
	t.print('------------------------------------', left, top + 1);
	t.charColor(255, 195, 55);
	t.print('CONCEPT: RESTORE LAYER VISIBILITY', left, top + 2);
	t.charColor(200, 160, 150);
	t.print('show() unmasks layer compositing.', left, top + 3);
	t.charColor(active ? 255 : 180, active ? 195 : 80, active ? 55 : 80);
	t.print(`CORE LAYER: ${active ? 'VISIBLE (SHOWN)' : 'HIDDEN (MUTED)'}`, left, top + 4);
	t.charColor(255, 85, 70);
	t.print(`IS VISIBLE: ${active}`, left, top + 5);
	t.charColor(255, 245, 215);
	t.print('CLICK CANVAS TO TOGGLE SHOW/HIDE', left, top + 6);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
