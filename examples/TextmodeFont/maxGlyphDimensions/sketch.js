/**
 * @title TextmodeFont.maxGlyphDimensions
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

function label(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);
	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	const dims = t.font.maxGlyphDimensions;
	const w = Math.max(2, Math.round(dims.width / 4));
	const h = Math.max(2, Math.round(dims.height / 4));

	t.background(8, 10, 22);
	t.char('#');
	t.charColor(120, 220, 255);
	t.rect(w, h);
	label('maxGlyphDimensions', -6, [255, 210, 90]);
	label(`${dims.width}px x ${dims.height}px`, -2);
	label('scaled box shows the max glyph bounds', 5, [150, 160, 190]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
