/**
 * @title Textmodifier.lastKeyPressed
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
	t.background(0);

	const lastKey = t.lastKeyPressed;
	if (lastKey) {
		t.char(lastKey);
		t.charColor(255, 255, 255);
		t.point();
	}
});
