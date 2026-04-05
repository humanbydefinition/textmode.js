/**
 * @title Textmodifier.lastKeyReleased
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
	t.background(0);

	const lastKey = t.lastKeyReleased;
	if (lastKey) {
		t.char(lastKey);
		t.charColor(128, 128, 128);
		t.point();
	}
});
