/**
 * @title TextmodeFramebuffer.end
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
	t.background(22, 8, 26);
	writeLine('OFFSCREEN', -1, [255, 220, 140]);
	writeLine('PASS', 2, [120, 210, 255]);
	fb.end();

	t.background(4, 6, 14);
	t.push();
	t.translate(0, -4);
	t.image(fb);
	t.pop();

	const wave = Math.sin(t.frameCount * 0.08) * 0.5 + 0.5;
	t.charColor(120 + wave * 135, 220, 255);
	t.char('*');

	for (let i = 0; i < 18; i++) {
		t.push();
		t.translate(i - 8.5, 8);
		t.point();
		t.pop();
	}

	writeLine('END() RETURNS TO THE MAIN CANVAS', 11, [220, 230, 255]);
});
