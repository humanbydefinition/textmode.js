/**
 * @title TextmodeLayer.loadFont
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const detailedLayer = t.layers.add({ blendMode: 'screen' });

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

t.setup(async () => {
	await detailedLayer.loadFont('../../primitives/FROGBLOCK-V2.1.ttf');
});

t.draw(() => {
	t.background(6, 10, 22);

	drawCenteredText('TextmodeLayer.loadFont', -12, [240, 245, 255]);
	drawCenteredText('Fonts are isolated to their specific layer.', -10, [150, 170, 200]);

	t.push();
	t.translate(0, 0);
	t.charColor(40, 50, 80);
	t.char('#');
	t.rect(14, 8);
	t.pop();

	drawCenteredText('BASE FONT: URSA (DEFAULT)', 10, [140, 180, 255]);
});

detailedLayer.draw(() => {
	t.clear();

	t.push();
	t.translate(0, 0);
	t.charColor(255, 225, 140, 180);
	t.char('0'); // A distinctive glyph in Frogblock
	t.rect(8, 4);
	t.pop();

	drawCenteredText('LOADED FONT: FROGBLOCK', 12, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
