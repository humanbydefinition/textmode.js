/**
 * @title Textmodifier.touches
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
	t.background(0);

	for (const touch of t.touches) {
		t.push();
		t.translate(touch.x, touch.y);

		const pulse = 1 + Math.sin(t.frameCount * 0.2) * 0.5;
		const radius = (touch.pressure || 0.5) * 20 * pulse;

		t.char('○');
		t.charColor(255, 100, 150);
		t.ellipse(radius, radius);

		t.char(((touch.id % 9) + 1).toString());
		t.charColor(255);
		t.point();
		t.pop();
	}

	if (t.touches.length === 0) {
		t.char('?');
		t.charColor(80);
		t.point();
	}
});
