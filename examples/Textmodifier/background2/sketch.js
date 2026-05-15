/**
 * @title Textmodifier.background2
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
	t.cellColor(0, 0, 0, 0);

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
	const time = t.frameCount * 0.05;
	const gray = Math.round(127 + 127 * Math.sin(time));

	t.background(gray);

	// that remains perfectly visible regardless of the background brightness.
	t.push();
	t.cellColor(255 - gray);
	t.charColor(gray);
	t.char('+');
	t.rect(20, 10);
	t.pop();

	drawCenteredText('Textmodifier.background (Grayscale)', -12, [240, 120, 255]);
	drawCenteredText('Passing a single number sets an R=G=B gray level.', -10, [150, 170, 200]);

	drawCenteredText('INVERTED CELL SCHEMATIC', 8, [255, 225, 140]);
	drawCenteredText(`BG_VAL: ${gray.toString().padStart(3, '0')}`, 10, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
