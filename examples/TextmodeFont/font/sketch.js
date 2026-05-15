/**
 * @title TextmodeFont.font
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

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
	t.background(6, 10, 22);

	const font = t.font.font;
	const head = font.head;
	const hhea = font.hhea;
	const maxp = font.maxp;

	drawCenteredText('TextmodeFont.font', -8, [240, 245, 255]);

	if (head && hhea && maxp) {
		drawCenteredText('unitsPerEm: ' + head.unitsPerEm, 0, [180, 200, 220]);
		drawCenteredText('ascender: ' + hhea.ascender, 4, [150, 170, 200]);
		drawCenteredText('descender: ' + hhea.descender, 8, [150, 170, 200]);
		drawCenteredText('numGlyphs: ' + maxp.numGlyphs, 12, [80, 255, 140]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
