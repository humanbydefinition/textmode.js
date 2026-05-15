/**
 * @title Textmodifier.pop
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate(i * 12 - 12, 0);
		t.rotateZ(t.frameCount * (1 + i * 0.5));
		t.charColor(100 + i * 70, 255 - i * 50, 150);
		t.char(['*', '@', '#'][i]);
		t.rect(8, 8);
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
