/**
 * @title Textmodifier.lastKeyPressed
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const lastKey = t.lastKeyPressed;
	if (lastKey) {
		t.char(lastKey);
		t.charColor(255, 255, 255);
		t.point();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
