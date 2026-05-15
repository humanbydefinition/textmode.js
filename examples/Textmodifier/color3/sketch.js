/**
 * @title Textmodifier.color3
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const baseColor = t.color('#6366f1'); // Indigo

const clonedColor = t.color(baseColor);

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

labelLayer.draw(() => {
	t.clear();

	drawCenteredText('Textmodifier.color (Hex/Clone)', -12, [240, 245, 255]);
	drawCenteredText('Creating colors from hex strings or existing objects.', -10, [150, 170, 200]);

	drawCenteredText('t.color("#RRGGBB") / t.color(otherColor)', 12, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	t.push();
	t.charColor(clonedColor);
	t.char('#');
	t.rect(14, 6);
	t.pop();

	drawCenteredText('CLONED INDIGO COLOR', 8, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
