/**
 * @title TextmodeLayer.asciiFramebuffer
 * @author codex
 * @description Inspects the underlying ASCII conversion framebuffer containing converted cells and color data.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const HEX = '0123456789ABCDEF';
const layer = t.layers.add({ blendMode: t.BLEND_SCREEN });
const labelLayer = t.layers.add({ fontSize: 16 });
let probeX = 0,
	probeY = 0,
	hasMouse = false;

layer.draw(() => {
	t.clear();
	const tm = t.frameCount * 0.035,
		hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	for (let y = -hh; y <= hh; y += 2) {
		for (let x = -hw; x <= hw; x += 2) {
			if (x < -hw + 38 && y < -hh + 12) continue;
			const d = Math.hypot(x, y * 1.4),
				a = Math.atan2(y, x);
			const wave = Math.sin(d * 0.28 - tm * 2 + a * 2) + Math.cos(x * 0.3 + tm) * Math.sin(y * 0.3 - tm);
			const dp = Math.hypot(x - probeX, (y - probeY) * 1.4);
			const rip = dp < 14 ? (1 - dp / 14) * Math.sin(dp * 1.2 - tm * 6) * 0.6 : 0;
			const v = Math.max(0, Math.min(1, (wave + rip + 1.6) * 0.32));
			if (v > 0.15) {
				t.push();
				t.translate(x, y);
				t.char(HEX[Math.floor(v * 15.99)]);
				t.charColor(v > 0.7 ? 235 : v > 0.4 ? 70 : 140, v > 0.7 ? 250 : v > 0.4 ? 220 : 90, 255);
				if (v > 0.7) t.cellColor(140, 90, 255, 90);
				t.point();
				t.pop();
			}
		}
	}
});

t.draw(() => {
	t.background(8, 10, 24);
	hasMouse = Number.isFinite(t.mouse.x) && Number.isFinite(t.mouse.y);
	probeX = hasMouse ? Math.round(t.mouse.x) : Math.round(Math.sin(t.secs * 1.5) * (t.grid.cols * 0.25));
	probeY = hasMouse ? Math.round(t.mouse.y) : Math.round(Math.cos(t.secs * 1.2) * (t.grid.rows * 0.22));
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2,
		top = -Math.floor(t.grid.rows / 2) + 2;
	const col = Math.max(0, Math.min(t.grid.cols - 1, Math.floor(t.grid.cols / 2) + probeX));
	const row = Math.max(0, Math.min(t.grid.rows - 1, Math.floor(t.grid.rows / 2) + probeY));
	const fb = layer.asciiFramebuffer;
	let rgba = [0, 0, 0, 0];
	if (fb) {
		const sx = Math.max(0, Math.min(fb.width - 1, Math.floor(((col + 0.5) / t.grid.cols) * fb.width)));
		const sy = Math.max(0, Math.min(fb.height - 1, Math.floor(((row + 0.5) / t.grid.rows) * fb.height)));
		const px = fb.readPixels(0),
			idx = (sy * fb.width + sx) * 4;
		rgba = Array.from(px.subarray(idx, idx + 4));
	}
	const [r, g, b, a] = rgba;
	const hex =
		'#' +
		[r, g, b]
			.map((c) => c.toString(16).padStart(2, '0'))
			.join('')
			.toUpperCase();
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(8, 10, 24, 220);
	const panel = `[fg=#46dcff]TEXTMODELAYER.ASCIIFRAMEBUFFER[/fg]
[fg=#8c5aff]------------------------------------[/fg]
[fg=#ebfaff]CONCEPT: ASCII TARGET INSPECTOR[/fg]
[fg=#46dcff]Samples resolved textmode pixels.[/fg]
[fg=#46dcff]${fb ? `BUFFER: ${fb.width}x${fb.height} RGBA PIXELS` : 'BUFFER: INITIALIZING'}[/fg]
[fg=#8c5aff]------------------------------------[/fg]
[fg=#ebfaff]PROBE: (${probeX}, ${probeY}) CELL [${col}, ${row}][/fg]
[fg=#46dcff]RGBA: ${r}, ${g}, ${b}, ${a}[/fg]
[fg=#ebfaff]HEX: ${hex} // HIT-TEST PROBE[/fg]
[fg=#8c5aff]${hasMouse ? 'HOVER: TRACKING MOUSE PROBE' : 'IDLE: AUTONOMOUS ORBIT PROBE'}[/fg]`;
	t.print(panel, left, top);
	t.pop();
	t.push();
	t.translate(probeX, probeY);
	t.charColor(235, 250, 255);
	t.cellColor(140, 90, 255, 200);
	t.char('+');
	t.point();
	t.charColor(70, 220, 255);
	t.cellColor(8, 10, 24, 200);
	t.print(`[${hex}]`, probeX > Math.floor(t.grid.cols / 2) - 11 ? -10 : 2, 0);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
