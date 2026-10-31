/**
 * @title TextmodeLayer.width
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const rulerLayer = t.layers.add({ fontSize: 8 });
const labelLayer = t.layers.add();
let caliperPx = 0;

t.draw(() => {
	t.background(8, 22, 46);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	t.charColor(35, 75, 130);
	for (let y = -hh + 3; y <= hh - 3; y += 4) {
		for (let x = -hw + 4; x <= hw - 4; x += 8) {
			t.print('+', x, y);
		}
	}
});

rulerLayer.draw(() => {
	t.clear();
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const totalW = rulerLayer.width;
	const time = t.frameCount * 0.04;
	const targetCol = isFinite(t.mouse.x) ? t.mouse.x * 2 : Math.sin(time) * (hw - 8);
	const caliperCol = Math.round(Math.max(-hw + 3, Math.min(hw - 3, targetCol)));
	caliperPx = Math.round(((caliperCol + hw) / Math.max(1, t.grid.cols)) * totalW);

	// Horizontal graduation rulers
	for (let x = -hw + 2; x <= hw - 2; x++) {
		const isMajor = (x + hw) % 12 === 0;
		const isMinor = (x + hw) % 4 === 0;
		const mark = isMajor ? '+' : isMinor ? '|' : '-';
		t.charColor(isMajor ? 140 : 65, isMajor ? 210 : 125, 255);
		t.print(mark, x, -hh + 2);
		t.print(mark, x, hh - 2);
	}

	// 3 acoustic carrier waves
	for (let x = -hw + 3; x <= hw - 3; x++) {
		const dist = Math.abs(x - caliperCol);
		const glow = Math.max(0, 1 - dist / 8);
		t.charColor(Math.round(60 + glow * 180), Math.round(150 + glow * 95), 255);
		[-7, 0, 7].forEach((cy, idx) => {
			const waveY = cy + Math.round(Math.sin((x / (hw || 1)) * Math.PI * 4 + time * 1.5 + idx * 1.6) * 2.5);
			t.print(dist < 2 ? '=' : dist < 5 ? '~' : '.', x, waveY);
		});
	}

	// Caliper vertical scanline
	t.char('|');
	t.charColor(120, 195, 255, 200);
	t.cellColor(18, 45, 85, 90);
	t.line(caliperCol, -hh + 3, caliperCol, hh - 3);

	// Reticles tracking carrier wave crossings
	[-7, 0, 7].forEach((cy, idx) => {
		const waveY = cy + Math.round(Math.sin((caliperCol / (hw || 1)) * Math.PI * 4 + time * 1.5 + idx * 1.6) * 2.5);
		t.cellColor(35, 95, 175, 220);
		t.charColor(255, 225, 120);
		t.print('#', caliperCol, waveY);
	});
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(8, 22, 46, 220);
	t.charColor(240, 248, 255);
	t.print('TEXTMODELAYER.WIDTH', left, top);
	t.charColor(55, 115, 195);
	t.print('------------------------------------', left, top + 1);
	t.charColor(120, 195, 255);
	t.print('CONCEPT: LAYER PIXEL WIDTH', left, top + 2);
	t.charColor(170, 205, 235);
	t.print('Reports ASCII framebuffer width.', left, top + 3);
	t.charColor(240, 248, 255);
	t.print(`RULER: ${rulerLayer.width}PX (${rulerLayer.grid.cols} COLS)`, left, top + 4);
	t.charColor(120, 195, 255);
	t.print(`BASE:  ${t.width}PX (${t.grid.cols} COLS)`, left, top + 5);
	t.charColor(255, 220, 120);
	t.print(`CALIPER: ${caliperPx}PX (MOVE MOUSE)`, left, top + 6);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
