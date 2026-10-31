/**
 * @title TextmodeLayer.height
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const sonarLayer = t.layers.add({ fontSize: 8 });
const labelLayer = t.layers.add();
let probePx = 0;

t.draw(() => {
	t.background(4, 14, 22);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	t.charColor(20, 60, 85);
	for (let y = -hh + 2; y <= hh - 2; y += 4) {
		for (let x = -hw + 4; x <= hw - 4; x += 8) {
			t.print('.', x, y);
		}
	}
});

sonarLayer.draw(() => {
	t.clear();
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const totalH = sonarLayer.height;
	const time = t.frameCount * 0.04;
	const targetRow = isFinite(t.mouse.y) ? t.mouse.y * 2 : Math.sin(time) * (hh - 8);
	const probeRow = Math.round(Math.max(-hh + 3, Math.min(hh - 3, targetRow)));
	probePx = Math.round(((probeRow + hh) / Math.max(1, t.grid.rows)) * totalH);

	// Vertical graduation rulers
	for (let y = -hh + 2; y <= hh - 2; y++) {
		const isMajor = (y + hh) % 10 === 0;
		const isMinor = (y + hh) % 5 === 0;
		const mark = isMajor ? '+' : isMinor ? '-' : '|';
		t.charColor(isMajor ? 40 : 25, isMajor ? 230 : 140, isMajor ? 190 : 170);
		t.print(mark, -hw + 2, y);
		t.print(mark, hw - 2, y);
	}

	// 3 vertical telemetry waves
	for (let y = -hh + 3; y <= hh - 3; y++) {
		const dist = Math.abs(y - probeRow);
		const glow = Math.max(0, 1 - dist / 8);
		t.charColor(Math.round(30 + glow * 170), Math.round(160 + glow * 95), Math.round(180 + glow * 75));
		[-14, 0, 14].forEach((cx, idx) => {
			const waveX = cx + Math.round(Math.sin((y / (hh || 1)) * Math.PI * 3 + time * 2 + idx * 1.6) * 3);
			t.print(dist < 2 ? '=' : dist < 5 ? '~' : '.', waveX, y);
		});
	}

	// Horizontal sounding beam
	t.char('-');
	t.charColor(40, 230, 190, 210);
	t.cellColor(10, 45, 60, 90);
	t.line(-hw + 3, probeRow, hw - 3, probeRow);

	// Reticles tracking telemetry wave crossings
	[-14, 0, 14].forEach((cx, idx) => {
		const waveX = cx + Math.round(Math.sin((probeRow / (hh || 1)) * Math.PI * 3 + time * 2 + idx * 1.6) * 3);
		t.cellColor(20, 85, 110, 220);
		t.charColor(255, 225, 120);
		t.print('#', waveX, probeRow);
	});
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(4, 14, 22, 220);
	t.charColor(200, 255, 245);
	t.print('TEXTMODELAYER.HEIGHT', left, top);
	t.charColor(30, 120, 220);
	t.print('------------------------------------', left, top + 1);
	t.charColor(40, 230, 190);
	t.print('CONCEPT: LAYER PIXEL HEIGHT', left, top + 2);
	t.charColor(140, 205, 225);
	t.print('Reports ASCII framebuffer height.', left, top + 3);
	t.charColor(200, 255, 245);
	t.print(`SONAR: ${sonarLayer.height}PX (${sonarLayer.grid.rows} ROWS)`, left, top + 4);
	t.charColor(40, 230, 190);
	t.print(`BASE:  ${t.height}PX (${t.grid.rows} ROWS)`, left, top + 5);
	t.charColor(255, 220, 120);
	t.print(`PROBE: ${probePx}PX (MOVE MOUSE Y)`, left, top + 6);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
