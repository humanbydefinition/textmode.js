/**
 * @title Textmodifier.doubleTap
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let pulse = 0;
let activeColor = t.color(100, 200, 255);

t.doubleTap(() => {
	pulse = 20;
	activeColor = t.color(Math.random() * 255, 200, Math.random() * 255);
});

t.draw(() => {
	t.background(0);
	if (pulse > 0) pulse -= 1;

	const size = 15 + pulse;
	t.char('▓');
	t.charColor(activeColor);
	t.rect(size, size);

	if (pulse > 0) {
		t.push();
		t.char('░');
		t.charColor(255, 255, 255, pulse * 12);
		t.rect(size + 5, size + 5);
		t.pop();
	}
});
