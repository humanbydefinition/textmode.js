/**
 * @title Textmodifier.color2
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const colorCyan = t.color(100, 220, 255);
const colorGold = t.color(255, 225, 140, 150); // Semi-transparent

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

	drawCenteredText('Textmodifier.color (RGB)', -12, [240, 245, 255]);
	drawCenteredText('Creating reusable colors from RGB or RGBA values.', -10, [150, 170, 200]);

	drawCenteredText('t.color(r, g, b, a)', 12, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.03;

	t.push();
	t.char('o');

	t.push();
	t.translate(Math.cos(time) * 10, Math.sin(time) * 5);
	t.charColor(colorCyan);
	t.ellipse(14, 14);
	t.pop();

	// Static golden core (semi-transparent)
	t.push();
	t.charColor(colorGold);
	t.rect(10, 10);
	t.pop();

	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
