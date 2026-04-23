/**
 * @title Textmodifier.pressedKeys
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const pressed = t.pressedKeys;

	pressed.forEach((key, index) => {
		t.push();
		t.char(key[0] || '?');
		t.charColor(255, 200, 100);
		t.translate(index, 0);
		t.point();
		t.pop();
	});
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
