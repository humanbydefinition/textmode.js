/**
 * @title TextmodeFont.characters
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

t.draw(() => {
	const chars = t.font.characters.slice(0, 96);
	const cols = 16;
	const rows = Math.ceil(chars.length / cols);
	const startX = -Math.floor(cols / 2);
	const startY = -Math.floor(rows / 2);

	t.background(8, 10, 22);

	for (let i = 0; i < chars.length; i++) {
		const glyph = chars[i];
		t.push();
		t.translate(startX + (i % cols), startY + Math.floor(i / cols));
		t.char(glyph.character);
		t.charColor(120 + (i % cols) * 6, 140 + (i % rows) * 10, 255 - (i % cols) * 5);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
