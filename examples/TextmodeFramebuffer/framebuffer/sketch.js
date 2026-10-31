/**
 * @title TextmodeFramebuffer.framebuffer
 * @author codex
 * @description Exposes underlying WebGLFramebuffer handle for native GL inspection and custom pipelines.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 }),
	RAMP = ' .:-=+*#%@';
let fb,
	spin = 0,
	pitch = 54;
t.setup(() => (fb = t.createFramebuffer({ width: 20, height: 20 })));

t.draw(() => {
	t.background(6, 12, 8);
	if (!fb) return;
	const time = t.frameCount * 0.03;
	spin = (time * 36 + (Number.isFinite(t.mouse.x) ? (t.mouse.x / (t.grid.cols || 1)) * 360 : 0)) % 360;
	pitch = Number.isFinite(t.mouse.y) ? 35 + (t.mouse.y / (t.grid.rows || 1)) * 35 : 52 + Math.sin(time) * 8;

	fb.begin();
	t.clear();
	t.background(8, 16, 12);
	const hw = Math.floor(fb.width / 2),
		hh = Math.floor(fb.height / 2);
	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const w = Math.sin(Math.hypot(x, y) * 0.7 - time * 3.2) * Math.cos(x * 0.45 + time * 1.5) * 0.5 + 0.5;
			t.charColor(20 + w * 190, 130 + w * 125, 65 + w * 155);
			t.cellColor(6, 18, 12, 180);
			t.print(RAMP[Math.floor(w * (RAMP.length - 1))] || ' ', x, y);
		}
	}
	fb.end();

	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	const wide = t.grid.cols > 80;
	const x1 = wide ? Math.max(left + 41, 6) : -19,
		x2 = wide ? Math.floor(t.grid.cols / 2) - 2 : 19;
	const y1 = wide ? top + 2 : 1,
		y2 = Math.floor(t.grid.rows / 2) - 2;
	const cx = Math.floor((x1 + x2) / 2),
		cy = Math.floor((y1 + y2) / 2) + 1;

	t.charColor(50, 240, 120);
	t.print('+', x1, y1);
	t.print('+', x2, y1);
	t.print('+', x1, y2);
	t.print('+', x2, y2);
	t.print('+', x1, y1 + 2);
	t.print('+', x2, y1 + 2);
	for (let x = x1 + 1; x < x2; x++) {
		t.print('-', x, y1);
		t.print('-', x, y1 + 2);
		t.print('-', x, y2);
	}
	t.charColor(20, 130, 65);
	for (let y = y1 + 1; y < y2; y++)
		if (y !== y1 + 2) {
			t.print('|', x1, y);
			t.print('|', x2, y);
		}
	t.charColor(210, 255, 220);
	t.print('=[ GL_FRAMEBUFFER :: 3D STAGE ]=', x1 + 2, y1 + 1);

	t.push();
	t.translate(cx, cy, 0);
	t.rotateX(pitch);
	t.rotateZ(spin);
	t.charColor(20, 130, 65);
	t.char('.');
	t.cellColor(10, 20, 14, 160);
	t.rect(20, 20);
	for (let i = -10; i <= 10; i += 2) {
		t.char('-');
		t.line(-10, i, 10, i);
		t.char('|');
		t.line(i, -10, i, 10);
	}
	t.charColor(50, 240, 120);
	for (let g = 0; g < 25; g++) {
		t.push();
		t.translate(-10 + (g % 5) * 5, -10 + Math.floor(g / 5) * 5, 0);
		t.char('+');
		t.point();
		t.pop();
	}
	t.push();
	t.translate(0, 0, 2);
	t.image(fb, 16, 16);
	t.pop();
	t.charColor(210, 255, 220);
	t.char('.');
	t.rect(18, 18);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	const isNative = typeof WebGLFramebuffer !== 'undefined' && fb?.framebuffer instanceof WebGLFramebuffer;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 14, 24, 220);
	// Inline colors keep the complete telemetry panel in one text block.
	const panel = `[fg=#32f078]TEXTMODEFRAMEBUFFER.FRAMEBUFFER[/fg]
[fg=#148241]------------------------------------[/fg]
[fg=#d2ffdc]CONCEPT: RAW WEBGL HANDLE[/fg]
[fg=#32f078]Direct WebGLFramebuffer access.[/fg]
[fg=#d2ffdc]HANDLE: ${isNative ? 'WebGLFramebuffer' : 'Disposed'}[/fg]
[fg=#148241]STATUS: ${isNative ? 'Active (WebGL2 Context)' : 'Inactive'}[/fg]
[fg=#d2ffdc]TARGET: ${fb?.width || 0}x${fb?.height || 0} RGBA8 + DEPTH24[/fg]
[fg=#32f078]STAGE ROT: ${spin.toFixed(0)} PITCH: ${pitch.toFixed(0)} DEG[/fg]
[fg=#148241]------------------------------------[/fg]
[fg=#32f078]MOUSE MOVEMENT: ORBITAL SCRUB[/fg]
[fg=#d2ffdc]AUTO-IDLE PRECESSION ACTIVE[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
