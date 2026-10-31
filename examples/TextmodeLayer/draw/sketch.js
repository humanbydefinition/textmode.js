/**
 * @title TextmodeLayer.draw
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const starLayer = t.layers.add({ opacity: 0.7 });
const waveLayer = t.layers.add({ blendMode: t.BLEND_ADDITIVE });
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(8, 10, 24);

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	t.push();
	t.charColor(25, 35, 65);
	for (let y = -hh + (hh % 4); y <= hh; y += 4) {
		for (let x = -hw + (hw % 8); x <= hw; x += 8) {
			t.print('+', x, y);
		}
	}
	t.pop();
});

starLayer.draw(() => {
	t.clear();
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const time = t.frameCount * 0.02;
	const chars = ['.', '·', '*', '+'];

	t.push();
	t.charColor(140, 90, 255);
	for (let i = 0; i < 36; i++) {
		const seed = i * 137.5;
		const speed = 0.3 + (i % 3) * 0.2;
		const x = Math.floor(((seed + time * speed * 20) % (hw * 2 + 10)) - hw - 5);
		const y = Math.floor(((seed * 2.3) % (hh * 2)) - hh);
		const charIdx = (i + Math.floor(time * 2)) % chars.length;
		t.print(chars[charIdx], x, y);
	}
	t.pop();
});

waveLayer.draw(() => {
	t.clear();
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const time = t.frameCount * 0.04;
	const mx = isFinite(t.mouse.x) ? t.mouse.x : Math.sin(time * 1.5) * (hw * 0.5);
	const my = isFinite(t.mouse.y) ? t.mouse.y : Math.cos(time * 1.2) * (hh * 0.4);

	t.push();
	for (let x = -hw; x <= hw; x++) {
		const normX = x / (hw || 1);
		const wave1 = Math.sin(normX * Math.PI * 3 + time * 2) * 4;
		const wave2 = Math.cos(normX * Math.PI * 5 - time * 1.5) * 2;
		const py = Math.floor(wave1 + wave2 + my * 0.3);
		const isNear = Math.abs(x - mx) < 4;

		t.charColor(isNear ? 235 : 70, isNear ? 250 : 220, 255);
		t.cellColor(isNear ? 40 : 12, isNear ? 30 : 15, isNear ? 70 : 35);
		t.print(isNear ? '#' : '=', x, py);
	}
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;

	t.push();
	t.printAlign('left', 'top');
	t.cellColor(8, 10, 24, 220);
	t.charColor(70, 220, 255);
	t.print('TEXTMODELAYER.DRAW', left, top);
	t.charColor(50, 70, 110);
	t.print('------------------------------------', left, top + 1);
	t.charColor(140, 90, 255);
	t.print('CONCEPT: DEDICATED LAYER CALLBACKS', left, top + 2);
	t.charColor(170, 190, 230);
	t.print('Each layer executes its own loop.', left, top + 3);
	t.charColor(70, 220, 255);
	t.print('BASE: GRID  MID: STARS  TOP: WAVES', left, top + 4);
	t.charColor(140, 90, 255);
	t.print(`FRAME: ${t.frameCount} (INDEPENDENT BUFFERS)`, left, top + 5);
	t.charColor(235, 250, 255);
	t.print('MOVE MOUSE TO MODULATE WAVE PHASE', left, top + 6);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
