/**
 * @title Textmodifier.createFramebuffer
 * @author codex
 * @description Allocates offscreen framebuffers rendered and composited across depth layers with bioluminescent waves.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const fbBack = t.createFramebuffer({ width: 36, height: 18 }),
	fbMid = t.createFramebuffer({ width: 26, height: 14 }),
	fbFore = t.createFramebuffer({ width: 16, height: 10 });
const labelLayer = t.layers.add({ fontSize: 16 });
let cx = 0,
	cy = 0,
	ripple = 0;
t.mouseClicked(() => (ripple = 1));

t.draw(() => {
	const time = t.frameCount * 0.035;
	ripple *= 0.93;
	const hasMouse = Number.isFinite(t.mouse.x) && Number.isFinite(t.mouse.y);
	const targetX = hasMouse ? t.mouse.x * 0.7 : Math.sin(time * 0.9) * 14;
	const targetY = hasMouse ? t.mouse.y * 0.7 : Math.cos(time * 0.7) * 7;
	cx += (targetX - cx) * 0.08;
	cy += (targetY - cy) * 0.08;
	fbBack.begin();
	t.clear();
	t.charColor(30, 120, 220);
	t.char('~');
	for (let i = -1; i <= 1; i++) {
		for (let x = -16; x < 16; x += 4) {
			t.line(
				x,
				i * 4.5 + Math.sin(x * 0.25 + time + i) * (2 + ripple * 2),
				x + 4,
				i * 4.5 + Math.sin((x + 4) * 0.25 + time + i) * (2 + ripple * 2)
			);
		}
	}
	fbBack.end();
	fbMid.begin();
	t.clear();
	t.charColor(40, 230, 190);
	t.char('=');
	for (let x = -11; x < 11; x += 3) {
		t.line(
			x,
			Math.sin(x * 0.35 - time * 1.3) * (3 + ripple * 3),
			x + 3,
			Math.sin((x + 3) * 0.35 - time * 1.3) * (3 + ripple * 3)
		);
	}
	t.char('*');
	t.ellipse(8, 4);
	fbMid.end();
	fbFore.begin();
	t.clear();
	t.charColor(40, 230, 190);
	t.char('*');
	t.ellipse(12, 6);
	t.charColor(200, 255, 245);
	t.char('#');
	t.rect(6, 3);
	fbFore.end();

	t.background(4, 14, 22);
	t.charColor(14, 45, 75);
	for (let i = 0; i < 12; i++) {
		t.print(
			'.',
			Math.sin(i * 1.9 + time * 0.2) * (t.grid.cols * 0.4),
			Math.cos(i * 2.7 + time * 0.2) * (t.grid.rows * 0.4)
		);
	}
	const stamp = (b, x, y) => (t.push(), t.translate(x, y), t.image(b), t.pop());
	stamp(fbBack, cx * 0.2, cy * 0.2 - 5);
	stamp(fbBack, cx * 0.25, cy * 0.25 + 5);
	stamp(fbMid, -10 + cx * 0.5, cy * 0.5);
	stamp(fbMid, 10 + cx * 0.55, cy * 0.55);
	stamp(fbFore, cx * 0.9, cy * 0.9);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(4, 14, 22, 220);
	const panel = `[fg=#28e6be]TEXTMODIFIER.CREATEFRAMEBUFFER[/fg]
[fg=#1e78dc]PARALLAX OFFSCREEN DEPTH LAYERS[/fg]
[fg=#c8fff5]BUFFERS: [${fbBack.width}x${fbBack.height}, ${fbMid.width}x${fbMid.height}, ${fbFore.width}x${fbFore.height}][/fg]
[fg=#28e6be]INTERACTION: CURSOR ATTRACTOR[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
