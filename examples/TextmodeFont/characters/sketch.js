/**
 * @title TextmodeFont.characters
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

t.draw(() => {
	t.background(6, 10, 22);

	const chars = t.font.characters;
	const cols = 16;
	const startX = -Math.floor(cols / 2);
	const startY = -Math.floor(chars.length / cols / 2);

	for (let i = 0; i < chars.length; i++) {
		const glyph = chars[i];
		t.push();
		t.translate(startX + (i % cols), startY + Math.floor(i / cols));
		t.char(glyph.character);
		t.charColor(255, 255, 255);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
