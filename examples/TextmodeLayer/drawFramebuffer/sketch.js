/**
 * @title TextmodeLayer.drawFramebuffer
 * @author codex
 * @description Demonstrates sampling and blitting the layer's pre-ASCII internal raster framebuffer.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const sourceLayer = t.layers.add();
sourceLayer.opacity(0);
const labelLayer = t.layers.add({ fontSize: 16 });
const ramp = ' .:-=+*#%@';

sourceLayer.draw(() => {
	t.clear();
	const tm = t.frameCount * 0.035,
		hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	const hasM = Number.isFinite(t.mouse.x),
		isDrag = t.mouseIsPressed && hasM;
	const mx = hasM ? t.mouse.x : Math.sin(tm * 1.1) * (hw * 0.45);
	const my = hasM ? t.mouse.y : Math.cos(tm * 0.8) * (hh * 0.45);
	const v1x = Math.sin(tm * 0.9) * 16,
		v1y = Math.cos(tm * 0.7) * 10;
	const v2x = -Math.cos(tm * 0.8) * 14,
		v2y = -Math.sin(tm * 1.0) * 9;
	for (let y = -hh; y <= hh; y += 2) {
		for (let x = -hw; x <= hw; x += 2) {
			const d1 = Math.hypot(x - v1x, y - v1y),
				d2 = Math.hypot(x - v2x, y - v2y);
			const wave1 = Math.sin(d1 * 0.38 - tm * 2.8),
				wave2 = Math.cos(d2 * 0.32 - tm * 2.1);
			const cell = Math.sin(x * 0.42 + wave1) * Math.cos(y * 0.42 + wave2);
			const dm = Math.hypot(x - mx, y - my),
				rad = isDrag ? 24 : 14;
			const imp = dm < rad ? Math.sin(dm * 0.75 - tm * 5) * (1 - dm / rad) * (isDrag ? 1.2 : 0.45) : 0;
			const v = Math.max(0, Math.min(1, wave1 * 0.3 + wave2 * 0.25 + cell * 0.25 + imp * 0.55 + 0.42));
			if (v > 0.06) {
				t.push();
				t.translate(x, y);
				t.char(ramp[Math.min(ramp.length - 1, Math.floor(v * ramp.length))]);
				t.charColor(
					v > 0.75 ? 200 : v > 0.42 ? 40 : 30,
					v > 0.75 ? 255 : v > 0.42 ? 230 : 120,
					v > 0.75 ? 245 : v > 0.42 ? 190 : 220
				);
				t.cellColor(10, 24, 38, Math.floor(v * 160));
				t.rect(2, 2);
				t.pop();
			}
		}
	}
});

t.draw(() => {
	t.background(4, 14, 22);
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	t.charColor(16, 42, 60);
	for (let y = -hh + 2; y <= hh - 2; y += 4) {
		for (let x = -hw + 3; x <= hw - 3; x += 6) t.print('.', x, y);
	}
	const fb = sourceLayer.drawFramebuffer;
	if (fb) {
		const mw = Math.min(Math.floor(t.grid.cols * 0.62), 46);
		const mh = Math.min(Math.floor(t.grid.rows * 0.54), 22);
		const bx = Math.floor(mw / 2),
			by = Math.floor(mh / 2);
		t.push();
		t.translate(0, 3);
		t.image(fb, mw, mh);
		t.charColor(40, 230, 190);
		t.print('+' + '-'.repeat(mw) + '+', -bx - 1, -by - 1);
		t.print('+' + '-'.repeat(mw) + '+', -bx - 1, by);
		for (let cy = -by; cy < by; cy++) {
			t.print('|', -bx - 1, cy);
			t.print('|', bx, cy);
		}
		t.charColor(200, 255, 245);
		for (const [px, py] of [
			[0, -by - 1],
			[0, by],
			[-bx - 1, 0],
			[bx, 0],
		])
			t.print('+', px, py);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	const fb = sourceLayer.drawFramebuffer;
	const isDrag = t.mouseIsPressed && Number.isFinite(t.mouse.x);
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 14, 24, 220);
	const panel = `[fg=#28e6be]TEXTMODELAYER.DRAWFRAMEBUFFER[/fg]
[fg=#1e78dc]------------------------------------[/fg]
[fg=#c8fff5]CONCEPT: PRE-ASCII RASTER BLIT[/fg]
[fg=#8cbedc]Samples layer pre-ASCII draw buffer.[/fg]
[fg=#8cbedc]Blits to canvas via t.image(fb, w, h)[/fg]
[fg=#1e78dc]------------------------------------[/fg]
[fg=#28e6be]${fb ? `BUFFER: ${fb.width} x ${fb.height} CELLS` : 'BUFFER: INITIALIZING'}[/fg]
[fg=#c8fff5]${isDrag ? 'IMPULSE: DRAG WAVE INJECTION' : 'IMPULSE: AUTONOMOUS DIFFUSION'}[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
