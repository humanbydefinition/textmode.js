/**
 * @title TextmodeFramebuffer.dispose
 * @author codex
 * @description Demonstrates explicit GPU resource cleanup and lifecycle recycling without memory leaks.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 });
const RAMP = ' .:-=+*#@',
	SIZES = [16, 22, 26, 20],
	CYCLE_FRAMES = 130;
let sizeIdx = -1,
	fb = null,
	cycleCount = 0,
	progress = 0,
	glitchTimer = 0;

function recycleFramebuffer() {
	if (fb) {
		fb.dispose();
		cycleCount++;
	}
	sizeIdx = (sizeIdx + 1) % SIZES.length;
	fb = t.createFramebuffer({ width: SIZES[sizeIdx], height: SIZES[sizeIdx] });
	progress = 0;
	glitchTimer = 8;
}
t.setup(recycleFramebuffer);
t.mouseClicked(recycleFramebuffer);
function plot(x, y, ch, fg, bg) {
	t.push();
	t.translate(x, y);
	t.charColor(...fg);
	if (bg) t.cellColor(...bg);
	t.char(ch);
	t.point();
	t.pop();
}

t.draw(() => {
	t.background(10, 10, 14);
	if (!fb) return;
	if (++progress >= CYCLE_FRAMES) recycleFramebuffer();
	if (glitchTimer > 0) glitchTimer--;
	const sz = SIZES[sizeIdx],
		half = Math.floor(sz / 2),
		time = t.frameCount * 0.05;
	fb.begin();
	t.background(10, 10, 14);
	for (let y = -half; y <= half; y++) {
		for (let x = -half; x <= half; x++) {
			const wave = Math.sin(Math.hypot(x, y) * 0.7 - time * 3) + Math.cos(Math.atan2(y, x) * 4 + time * 2);
			const v = Math.max(0, Math.min(1, (wave + (glitchTimer > 0 ? (Math.random() - 0.5) * 1.5 : 0) + 2) / 4));
			const c = v > 0.68 ? [255, 255, 255] : v > 0.38 ? [240, 65, 85] : [210, 215, 225];
			plot(
				x,
				y,
				RAMP[Math.floor(v * (RAMP.length - 1))],
				c,
				v > 0.68 ? [240, 65, 85, 210] : v > 0.38 ? [26, 18, 24] : [10, 10, 14]
			);
		}
	}
	fb.end();
	const mx = Number.isFinite(t.mouse.x) ? t.mouse.x * 0.08 : 0,
		my = Number.isFinite(t.mouse.y) ? t.mouse.y * 0.08 : 0;
	const ox = Math.round(
			Math.sin(t.frameCount * 0.03) * 2 + mx + 13 + (glitchTimer > 0 ? (Math.random() - 0.5) * 3 : 0)
		),
		oy = Math.round(Math.cos(t.frameCount * 0.025) * 1.5 + my);
	for (let i = 0; i < 36; i++) {
		const a = (i / 36) * Math.PI * 2 - Math.PI / 2,
			filled = i / 36 <= progress / CYCLE_FRAMES;
		plot(
			Math.round(ox + Math.cos(a) * (half + 4) * 1.45),
			Math.round(oy + Math.sin(a) * (half + 4)),
			filled ? '#' : '.',
			filled ? [240, 65, 85] : [65, 70, 85]
		);
	}
	const b = half + 1,
		fc = glitchTimer > 0 ? [240, 65, 85] : [210, 215, 225];
	for (let i = -b; i <= b; i++) {
		plot(ox + i, oy - b, i === -b || i === b ? '+' : '-', fc);
		plot(ox + i, oy + b, i === -b || i === b ? '+' : '-', fc);
		if (i > -b && i < b) {
			plot(ox - b, oy + i, '|', fc);
			plot(ox + b, oy + i, '|', fc);
		}
	}
	t.push();
	t.translate(ox, oy);
	if (glitchTimer > 0) t.rotateZ((Math.random() - 0.5) * 8);
	t.image(fb);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	const pct = Math.floor((progress / CYCLE_FRAMES) * 10);
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 14, 24, 220);
	// Inline colors keep the complete telemetry panel in one text block.
	const panel = `[fg=#ffffff]FRAMEBUFFER.DISPOSE[/fg]
[fg=#464b5a]------------------------[/fg]
[fg=#d2d7e1]BUFFER   : ${fb ? fb.width : 0}x${fb ? fb.height : 0}[/fg]
[fg=#${glitchTimer > 0 ? 'f04155' : 'd2d7e1'}]STATUS   : ${glitchTimer > 0 ? 'PURGING' : 'ACTIVE'}[/fg]
[fg=#f04155]FREED    : ${cycleCount} CYCLES[/fg]
[fg=#d2d7e1]VRAM     : [${'#'.repeat(pct)}${'.'.repeat(10 - pct)}] ${pct * 10}%[/fg]
[fg=#464b5a]------------------------[/fg]
[fg=#ffffff]CLICK: TRIGGER DISPOSE[/fg]`;
	t.print(panel, left, top);
	t.pop();
});
t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
