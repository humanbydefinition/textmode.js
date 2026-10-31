/**
 * @title TextmodeFramebuffer.begin
 * @author codex
 * @description Redirects rendering pipeline into an offscreen framebuffer for multi-instance orbital compositing.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 });
const fb = t.createFramebuffer({ width: 14, height: 14 }),
	RAMP = ' .:+*oO@';
let tx = 0,
	ty = 0;

t.draw(() => {
	const time = t.frameCount * 0.04;
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	// 1. Offscreen pass: render polar orbital core into framebuffer
	fb.begin();
	t.clear();
	t.background(12, 6, 22);
	for (let r = 1; r <= 5; r += 2) {
		const count = r * 5;
		for (let i = 0; i < count; i++) {
			const a = (i / count) * Math.PI * 2 + time * (r % 2 ? 1 : -1);
			const px = Math.round(Math.cos(a) * r),
				py = Math.round(Math.sin(a) * (r * 0.65));
			t.charColor(r === 1 ? 255 : 245, r === 1 ? 225 : 75, r === 1 ? 250 : 200);
			t.print(RAMP[(i + Math.floor(time * 3)) % RAMP.length], px, py);
		}
	}
	t.charColor(255, 225, 250);
	t.cellColor(245, 75, 200, 200);
	t.print('@', 0, 0);
	fb.end();

	// 2. Cursor attractor / idle Lissajous sweep
	const hasM = Number.isFinite(t.mouse.x) && (t.mouse.x !== 0 || t.mouse.y !== 0);
	const destX = hasM ? t.mouse.x : Math.sin(time * 0.8) * Math.min(20, hw * 0.45);
	const destY = hasM ? t.mouse.y : Math.sin(time * 1.3) * Math.min(10, hh * 0.35);
	tx += (destX - tx) * 0.12;
	ty += (destY - ty) * 0.12;
	const atX = Math.round(tx),
		atY = Math.round(ty);

	// 3. Main canvas pass: background grid and orbital blits
	t.clear();
	t.background(12, 6, 22);
	t.charColor(75, 200, 255, 45);
	for (let y = -hh + 3; y <= hh - 3; y += 4) {
		for (let x = -hw + 3; x <= hw - 3; x += 6) t.print('.', x, y);
	}
	t.charColor(255, 225, 250);
	t.print('O', atX, atY);

	for (let i = 0; i < 4; i++) {
		const angle = time * 0.6 + i * (Math.PI / 2);
		const dist = 14 + Math.sin(time * 1.5 + i) * 3;
		const ox = Math.round(atX + Math.cos(angle) * dist * 1.3),
			oy = Math.round(atY + Math.sin(angle) * dist * 0.7);
		t.char('-');
		t.charColor(75, 200, 255, 90);
		t.line(atX, atY, ox, oy);
		t.push();
		t.translate(ox, oy);
		t.image(fb);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(12, 6, 22, 220);
	const panel = `[fg=#f54bc8]TEXTMODEFRAMEBUFFER.BEGIN[/fg]
[fg=#4bc8ff]--------------------------------[/fg]
[fg=#ffe1fa]OFFSCREEN ORBITAL COMPOSITING[/fg]
[fg=#4bc8ff]fb.begin()  -> Render orbital core[/fg]
[fg=#4bc8ff]fb.end()    -> Restore main target[/fg]
[fg=#4bc8ff]t.image(fb) -> Blit 4 satellites[/fg]
[fg=#f54bc8]ATTRACTOR: [${Math.round(tx)}, ${Math.round(ty)}][/fg]
[fg=#f54bc8]MOUSE: ATTRACT | IDLE: LISSAJOUS[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
