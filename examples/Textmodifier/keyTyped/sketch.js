/**
 * @title Textmodifier.keyTyped
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const glyphs = [];

t.keyTyped((data) => {
	glyphs.push({
		char: data.key,
		x: (Math.random() - 0.5) * t.grid.cols,
		y: (Math.random() - 0.5) * t.grid.rows,
		life: 1,
	});
});

t.draw(() => {
	t.background(0);

	for (let i = glyphs.length - 1; i >= 0; i--) {
		const glyph = glyphs[i];
		glyph.life -= 0.015;
		glyph.y -= 0.04;

		if (glyph.life <= 0) {
			glyphs.splice(i, 1);
			continue;
		}

		t.push();
		t.translate(glyph.x, glyph.y);
		t.char(glyph.char);
		t.charColor(120 + glyph.life * 135, 180, 255, glyph.life * 255);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
