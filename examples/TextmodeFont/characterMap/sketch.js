/**
 * @title TextmodeFont.characterMap
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

	const time = t.frameCount * 0.02;
	const charIndex = Math.floor(time * 2) % t.font.characters.length;
	const glyph = t.font.characters[charIndex];
	const currentChar = glyph ? glyph.character : '?';
	const mapGlyph = t.font.characterMap.get(currentChar);

	drawCenteredText('TextmodeFont.characterMap', -8, [240, 245, 255]);

	if (mapGlyph) {
		const r = Math.round(mapGlyph.color[0] * 255);
		const g = Math.round(mapGlyph.color[1] * 255);
		const b = Math.round(mapGlyph.color[2] * 255);

		t.push();
		t.translate(0, 0);
		t.char(currentChar);
		t.charColor(255, 255, 255);
		t.point();
		t.pop();

		drawCenteredText('char: ' + currentChar, 6, [180, 200, 220]);
		drawCenteredText('color: ' + r + ', ' + g + ', ' + b, 10, [80, 255, 140]);
	}

	drawCenteredText('map.size: ' + t.font.characterMap.size, 14, [150, 170, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
