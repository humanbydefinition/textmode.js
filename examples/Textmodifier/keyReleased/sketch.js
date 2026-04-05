/**
 * @title Textmodifier.keyReleased
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let lastRelease = '?';
let fade = 0;

t.keyReleased((data) => {
	lastRelease = data.key;
	fade = 10;
});

t.draw(() => {
	t.background(0);

	const glow = Math.max(0, fade--);
	const color = 80 + glow * 17;
	t.charColor(color, color, 255);
	t.char(lastRelease.length ? lastRelease[0] : '?');
	t.point();
});
