/**
 * @title Textmodifier.cursor
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });
const target = { width: 30, height: 15 };

t.draw(() => {
	t.background(0);
	t.charColor(255);
	t.char('*');
	t.rect(target.width, target.height);

	const halfRectWidth = target.width / 2;
	const halfRectHeight = target.height / 2;

	const hovering =
		t.mouse.x !== Number.NEGATIVE_INFINITY &&
		t.mouse.x >= -halfRectWidth &&
		t.mouse.x < halfRectWidth &&
		t.mouse.y >= -halfRectHeight &&
		t.mouse.y < halfRectHeight;

	t.cursor(hovering ? 'pointer' : 'default');
});
