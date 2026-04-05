/**
 * @title TextmodeFramebuffer.begin
 * @author codex
 */
const t = textmode.create({
	width: 720,
	height: 420,
	fontSize: 16,
});

const fb = t.createFramebuffer({ width: 18, height: 10 });

function writeLine(text, y, color) {
	const startX = -((text.length - 1) * 0.5);
	t.charColor(...color);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(startX + i, y);
		t.char(text[i]);
		t.point();
		t.pop();
	}
}

t.draw(() => {
	fb.begin();
	t.background(16, 10, 28);

	for (let i = 0; i < 12; i++) {
		const angle = t.frameCount * 0.03 + i * 0.52;
		t.push();
		t.charColor(255, 170 + i * 5, 90 + i * 10);
		t.char(i % 2 === 0 ? '+' : '*');
		t.translate(Math.cos(angle) * 5, Math.sin(angle) * 3);
		t.point();
		t.pop();
	}

	fb.end();

	t.background(6, 8, 18);
	for (let i = 0; i < 4; i++) {
		const angle = t.frameCount * 0.015 + i * (Math.PI / 2);
		t.push();
		t.translate(Math.cos(angle) * 14, Math.sin(angle) * 8);
		t.rotateZ(i * 90 + t.frameCount);
		t.image(fb);
		t.pop();
	}

	writeLine('BEGIN() BINDS THE FBO', -11, [220, 230, 255]);
});
