/**
 * @title TextmodeFramebuffer.end
 * @author codex
 * @description Restores main canvas render target after completing offscreen framebuffer operations.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 });
const fb = t.createFramebuffer({ width: 20, height: 20 }),
	RAMP = ' .+*#@';
let tx = 0,
	ty = 0;

t.draw(() => {
	const time = t.frameCount * 0.035;
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	const hasM = Number.isFinite(t.mouse.x) && (t.mouse.x !== 0 || t.mouse.y !== 0);
	const destX = hasM ? t.mouse.x : Math.sin(time) * Math.min(16, hw * 0.4);
	const destY = hasM ? t.mouse.y : 5 + Math.cos(time * 0.8) * Math.min(5, hh * 0.25);
	tx += (destX - tx) * 0.15;
	ty += (destY - ty) * 0.15;

	// 1. Offscreen pass: render bioluminescent radial orbital system into fb
	fb.begin();
	t.clear();
	t.background(6, 18, 30);
	t.charColor(30, 120, 220, 100);
	t.print('+', 0, 0);
	[2, 4, 6, 8].forEach((rad, idx) => {
		const count = rad * 5,
			dir = idx % 2 === 0 ? 1 : -1;
		for (let i = 0; i < count; i++) {
			const th = (i / count) * Math.PI * 2 + time * (0.8 + idx * 0.3) * dir;
			const qx = Math.round(Math.cos(th) * rad),
				qy = Math.round(Math.sin(th) * (rad * 0.65));
			const ci = 1 + (Math.floor(Math.sin(time * 2 + i * 0.5) * 1.9 + 2) % 4);
			const col = idx === 1 ? [200, 255, 245] : idx === 2 ? [40, 230, 190] : [30, 120, 220];
			t.charColor(...col);
			t.cellColor(4, 18, 28, 160);
			t.print(RAMP[ci], qx, qy);
		}
	});
	t.charColor(200, 255, 245);
	t.cellColor(40, 230, 190, 220);
	t.print('#', 0, 0);
	fb.end();

	// 2. Main canvas pass: deep ocean background, origin beacon, and tether
	t.clear();
	t.background(4, 14, 22);
	t.charColor(16, 44, 68);
	for (let y = -hh + 2; y <= hh - 2; y += 4) {
		for (let x = -hw + 3; x <= hw - 3; x += 6) t.print('.', x, y);
	}
	t.charColor(30, 120, 220);
	t.print('O', 0, 0);
	const bx = Math.round(tx),
		by = Math.round(ty);
	t.char('-');
	t.charColor(30, 120, 220, 160);
	t.line(0, 0, bx, by);

	// 3. Blit offscreen framebuffer at attractor position
	t.push();
	t.translate(bx, by);
	t.image(fb);
	t.pop();
	const bw = Math.floor(fb.width / 2),
		bh = Math.floor(fb.height / 2);
	t.charColor(40, 230, 190);
	t.cellColor(10, 24, 36, 180);
	[
		['+', -bw, -bh],
		['+', bw, -bh],
		['+', -bw, bh],
		['+', bw, bh],
	].forEach(([c, dx, dy]) => {
		t.print(c, bx + dx, by + dy);
	});
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 14, 24, 220);
	// Inline colors keep the complete telemetry panel in one text block.
	const panel = `[fg=#28e6be]TEXTMODEFRAMEBUFFER.END[/fg]
[fg=#1e78dc]------------------------------------[/fg]
[fg=#c8fff5]RESTORES MAIN CANVAS DRAW TARGET[/fg]
[fg=#1e78dc]1. fb.begin() -> Offscreen polar orbit[/fg]
[fg=#28e6be]2. fb.end()   -> Pop back to backbuffer[/fg]
[fg=#c8fff5]3. t.image(fb)-> Composite at cursor[/fg]
[fg=#1e78dc]ATTRACTOR: [${Math.round(tx)}, ${Math.round(ty)}][/fg]
[fg=#28e6be]MOUSE: ATTRACT BLIT | IDLE: AUTONOMOUS[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
