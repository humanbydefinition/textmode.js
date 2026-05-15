/**
 * @title TextmodeLayer.font
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const bigFontLayer = t.layers.add({ fontSize: 24, blendMode: 'additive' });

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

	drawCenteredText('TextmodeLayer.font', -12, [240, 245, 255]);
	drawCenteredText('Each layer maintains its own independent font state.', -10, [150, 170, 200]);

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();

	const baseFont = t.layers.base.font;
	drawCenteredText(`BASE FONT: ${baseFont.fontSize} PX`, 12, [140, 180, 255]);
});

bigFontLayer.draw(() => {
	t.clear();
	const font = bigFontLayer.font;
	const chars = font.characters;
	const time = t.frameCount * 0.02;

	const cols = 8;
	const rows = 3;

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const idx = (r * cols + c + Math.floor(time * 10)) % chars.length;
			const glyph = chars[idx];

			t.push();
			t.translate(c - Math.floor(cols / 2), r - Math.floor(rows / 2));
			t.char(glyph.character);
			t.charColor(120, 180, 255);
			t.point();
			t.pop();
		}
	}

	drawCenteredText('LAYER FONT (ADDITIVE)', -4, [255, 225, 140]);
	drawCenteredText(`${font.fontSize} PX`, 6, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
