/**
 * @title TextmodeFramebuffer.attachmentCount
 * @author codex
 * @description Inspects the number of color texture attachments allocated for offscreen rendering.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 });
const PRESETS = [1, 2, 3, 4],
	RAMP = ' _.-~^';
const CH_COLORS = [
	[255, 245, 215],
	[255, 85, 70],
	[255, 195, 55],
	[255, 140, 75],
];
const CH_LABELS = ['GLYPHS (RG8)', 'CHARCOLOR', 'CELLCOLOR', 'AUX PAYLOAD'];
let presetIdx = 2,
	freq = 0.22;
let fb = t.createFramebuffer({ width: 34, height: 12, attachments: PRESETS[presetIdx] });

const setPreset = (idx) => {
	presetIdx = (idx + PRESETS.length) % PRESETS.length;
	fb.dispose();
	fb = t.createFramebuffer({ width: 34, height: 12, attachments: PRESETS[presetIdx] });
};
t.mouseClicked(() => setPreset(presetIdx + 1));
t.keyPressed(() => setPreset(presetIdx + 1));

t.draw(() => {
	const time = t.frameCount * 0.04;
	const mx = Number.isFinite(t.mouse.x) ? t.mouse.x : Math.sin(time * 1.2) * 12;
	freq = 0.18 + Math.abs(mx) * 0.012;
	const hw = 17,
		hh = 6,
		sweepX = Math.round(((t.frameCount * 0.8) % 32) - hw + 1);
	fb.begin();
	t.clear();
	t.background(16, 6, 10);
	for (let x = -hw; x < hw; x += 2) {
		t.push();
		t.translate(x, 0);
		t.char(x === 0 ? '+' : x % 4 === 0 ? '.' : '-');
		t.charColor(48, 16, 22);
		t.point();
		t.pop();
	}
	for (let x = -hw; x < hw; x++) {
		for (let ch = 0; ch < fb.attachmentCount; ch++) {
			const wave =
				ch === 3
					? Math.sign(Math.sin(x * freq * 1.5 + time * 2.8)) * 3.2
					: Math.sin(x * freq * (1 + ch * 0.45) + time * (1.8 + ch * 0.35) + ch * 1.3) * (3.8 - ch * 0.5);
			const y = Math.max(-hh + 1, Math.min(hh - 1, Math.round(wave)));
			const rIdx = Math.min(5, Math.max(0, Math.floor(((wave + 4) / 8) * 5)));
			t.push();
			t.translate(x, y);
			t.char(ch === 3 ? '#' : x === sweepX ? '.' : RAMP[rIdx]);
			t.charColor(...CH_COLORS[ch]);
			if (fb.attachmentCount >= 3 && ch >= 2) t.cellColor(ch === 2 ? 52 : 72, 16, 22);
			t.point();
			t.pop();
		}
	}
	fb.end();
	t.background(16, 6, 10);
	const cx = t.grid.cols > 76 ? 16 : 0,
		cy = t.grid.cols > 76 ? 0 : 2;
	t.push();
	t.translate(cx, cy);
	t.charColor(255, 85, 70);
	t.cellColor(20, 8, 12);
	t.printAlign('center', 'middle');
	t.print('+---------- CRT OSCILLOSCOPE ------+', 0, -hh - 1);
	t.print('+----------------------------------+', 0, hh);
	for (let sy = -hh; sy < hh; sy++) {
		t.print('|', -hw - 1, sy);
		t.print('|', hw, sy);
	}
	t.image(fb);
	for (let c = 0; c < 4; c++) {
		const active = c < fb.attachmentCount,
			bx = -12 + c * 8;
		t.charColor(...(active ? CH_COLORS[c] : [75, 30, 35]));
		t.cellColor(active ? 42 : 18, active ? 14 : 7, active ? 18 : 9, 220);
		t.print('+-----+', bx, hh + 2);
		t.print(`|A${c}:${active ? 'ON' : '..'}|`, bx, hh + 3);
		t.print('+-----+', bx, hh + 4);
	}
	t.pop();
});
labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 14, 24, 220);
	// Inline colors keep the complete telemetry panel in one text block.
	const panel = `[fg=#ff5546]OSCILLOSCOPE TELEMETRY // BUFFERS[/fg]
[fg=#782d23]------------------------------------[/fg]
[fg=#ffc337]ATTACHMENTS: ${fb.attachmentCount} TARGETS (A0..A${fb.attachmentCount - 1})[/fg]
[fg=#fff5d7]SWEEP FREQ : ${freq.toFixed(2)} RAD/CELL[/fg]
[fg=#782d23]------------------------------------[/fg]
[fg=#ffc337]CLICK / KEY: CYCLE TARGETS (1-4)[/fg]
[fg=#ff5546]MOUSE X: MODULATE SWEEP RATE[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
