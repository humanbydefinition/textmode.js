/**
 * @title TextmodeLayer.rotateZ
 * @author codex
 * @description Demonstrates layer rotation around center origin with continuous orbital sweep.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const RAMP = ' .+*#@';
const orbitLayer = t.layers.add({ blendMode: t.BLEND_ADDITIVE });
const labelLayer = t.layers.add({ fontSize: 16 });
const MODES = [
	{ name: 'SYNCHRONOUS (+1.0)', speed: 1.0 },
	{ name: 'WARP SURGE  (+2.6)', speed: 2.6 },
	{ name: 'RETROGRADE  (-1.2)', speed: -1.2 },
	{ name: 'STASIS SCAN (+0.3)', speed: 0.3 },
];
const RINGS = [
	{ n: 3, r: 0.38, ch: RAMP[4], col: [70, 220, 255], spoke: true },
	{ n: 5, r: 0.72, ch: RAMP[3], col: [140, 90, 255], loop: true },
	{ n: 2, r: 1.0, ch: '#', col: [235, 250, 255], bar: true },
];
let modeIdx = 0,
	currentAngle = 0,
	mod = 1;
const plot = (x, y, ch, r, g, b) => {
	t.push();
	t.translate(x, y);
	t.charColor(r, g, b);
	t.char(ch);
	t.point();
	t.pop();
};
t.mouseClicked(() => {
	modeIdx = (modeIdx + 1) % MODES.length;
});

t.draw(() => {
	t.background(8, 10, 24);
	currentAngle = (currentAngle + MODES[modeIdx].speed + 360) % 360;
	orbitLayer.rotateZ(currentAngle);
	const maxR = Math.min(Math.floor(t.grid.rows / 2) - 4, 20);
	const w = Math.min(Math.round(maxR * 1.8), Math.floor(t.grid.cols / 2) - 2),
		h = maxR + 2;
	t.push();
	t.charColor(28, 38, 72);
	t.char('-');
	t.line(-w, 0, w, 0);
	t.char('|');
	t.line(0, -h, 0, h);
	t.pop();
	plot(0, 0, '+', 48, 64, 115);
	for (const [cx, cy, ch] of [
		[-w, -h, '+'],
		[w, -h, '+'],
		[-w, h, '+'],
		[w, h, '+'],
	])
		plot(cx, cy, ch, 48, 64, 115);
	for (let a = 0; a < 16; a++) {
		const rad = (a * Math.PI) / 8,
			cx = Math.cos(rad) * 1.65,
			cy = Math.sin(rad);
		for (const { r } of RINGS) plot(Math.round(cx * maxR * r), Math.round(cy * maxR * r), '.', 32, 45, 80);
	}
});

orbitLayer.draw(() => {
	t.clear();
	const hasMouse = Number.isFinite(t.mouse.x) && Number.isFinite(t.mouse.y);
	mod = 1 + (hasMouse ? Math.min(0.45, Math.hypot(t.mouse.x, t.mouse.y) * 0.018) : Math.sin(t.secs * 2.2) * 0.12);
	const maxR = Math.min(Math.floor(t.grid.rows / 2) - 4, 20) * mod;
	plot(0, 0, RAMP[5] || '@', 235, 250, 255);
	for (const { n, r, ch, col, spoke, loop, bar } of RINGS) {
		const rad = maxR * r;
		let fx = 0,
			fy = 0,
			px = 0,
			py = 0;
		for (let i = 0; i < n; i++) {
			const a = (i * Math.PI * 2) / n + (loop ? 0.63 : bar ? 0.78 : 0);
			const x = Math.round(Math.cos(a) * rad * 1.65),
				y = Math.round(Math.sin(a) * rad);
			if (spoke) {
				t.charColor(38, 70, 115);
				t.char('.');
				t.line(0, 0, x, y);
			}
			if (loop && i > 0) {
				t.charColor(65, 45, 120);
				t.char('.');
				t.line(px, py, x, y);
			} else if (loop) {
				fx = x;
				fy = y;
			}
			if (bar) {
				t.charColor(50, 90, 140);
				t.char('-');
				t.line(x - 2, y, x + 2, y);
			}
			plot((px = x), (py = y), ch, ...col);
		}
		if (loop) {
			t.charColor(65, 45, 120);
			t.char('.');
			t.line(px, py, fx, fy);
		}
	}
	const sx = Math.round(maxR * 1.65);
	t.charColor(70, 220, 255);
	t.char('.');
	t.line(0, 0, sx, 0);
	plot(sx, 0, 'O', 235, 250, 255);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 14, 24, 220);
	// Inline colors keep the complete telemetry panel in one text block.
	const panel = `[fg=#46dcff]TEXTMODELAYER.ROTATEZ[/fg]
[fg=#304073]------------------------------------[/fg]
[fg=#ebfaff]LAYER ROTATION : ${orbitLayer.rotateZ().toFixed(1)} DEG[/fg]
[fg=#8c5aff]SWEEP MODE     : ${MODES[modeIdx].name}[/fg]
[fg=#46dcff]ORBIT SCALE    : ${(mod * 100).toFixed(0)}%[/fg]
[fg=#304073]------------------------------------[/fg]
[fg=#a0bee6]CLICK: CYCLE ROTATION SPEED/DIR[/fg]
[fg=#a0bee6]HOVER: MODULATE ORBITAL RADII[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
