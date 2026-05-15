/**
 * @title TextmodeFramebuffer.begin
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const fb = t.createFramebuffer({ width: 20, height: 12 });

function drawLabel(target, text, x, y, col = [255, 255, 255]) {
	target.push();
	target.translate(x, y);
	target.charColor(...col);
	for (let i = 0; i < text.length; i++) {
		target.push();
		target.translate(i, 0);
		target.char(text[i]);
		target.point();
		target.pop();
	}
	target.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.05;

	fb.begin();
	t.background(15, 10, 30);

	for (let i = 0; i < 15; i++) {
		const angle = time + i * 0.5;
		t.push();
		t.charColor(255, 150 + i * 5, 100 + i * 8);
		t.char('@');
		t.translate(Math.cos(angle) * 6, Math.sin(angle) * 4);
		t.rect(2, 2);
		t.pop();
	}

	drawLabel(t, 'OFF-SCREEN', -(10 - 1) / 2, 0, [255, 220, 150]);

	fb.end();

	t.background(6, 8, 18);
	const { cols, rows } = t.grid;

	for (let i = 0; i < 4; i++) {
		const angle = time * 0.3 + i * (Math.PI / 2);
		t.push();
		t.translate(Math.cos(angle) * 16, Math.sin(angle) * 8);

		t.image(fb);
		t.pop();
	}

	const title = '--- FRAMEBUFFER BEGIN() ---';
	drawLabel(t, title, -(title.length - 1) / 2, -(rows - 1) / 2 + 2, [180, 220, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
