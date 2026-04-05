/**
 * @title Textmodifier.mouse
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
	t.background(0);

	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		t.push();
		t.translate(t.mouse.x, t.mouse.y);
		t.char('*');
		t.charColor(255, 0, 0);
		t.cellColor(100);
		t.point();
		t.pop();
	}
});
