/**
 * @title Textmodifier.keyPressed
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let lastKey = '?';
let pulse = 0;

t.keyPressed((data) => {
	lastKey = data.key;
	pulse = 6;
});

t.draw(() => {
	t.background(0);

	const glow = Math.max(0, pulse--);
	const brightness = 120 + glow * 20;
	t.charColor(brightness, brightness, 0);

	t.push();
	t.char(lastKey.length ? lastKey[0] : '?');
	t.point();
	t.pop();
});
