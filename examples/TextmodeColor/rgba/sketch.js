/**
 * @title TextmodeColor.rgba
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const color = t.color(255, 128, 0, 100);

function drawText(text, x, y, rgb = [255, 255, 255], alpha = 255) {
	t.push();
	t.translate(x, y);
	t.charColor(rgb[0], rgb[1], rgb[2], alpha);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

function drawCenteredText(text, y, rgb = [255, 255, 255], alpha = 255) {
	drawText(text, -Math.floor(text.length / 2), y, rgb, alpha);
}

function drawChecker(x, y, width, height) {
	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			if ((row + col) % 2 !== 0) {
				continue;
			}

			t.push();
			t.translate(x + col, y + row);
			t.charColor(90, 100, 120, 90);
			t.char('.');
			t.point();
			t.pop();
		}
	}
}

function drawSwatch(x, label, swatchColor, alpha = 255) {
	const left = x - 4;
	drawChecker(left, -2, 8, 4);

	t.push();
	t.translate(x, 0);
	t.charColor(swatchColor[0], swatchColor[1], swatchColor[2], alpha);
	t.char('@');
	t.rect(8, 4);
	t.pop();

	drawText(label, x - Math.floor(label.length / 2), 4, [220, 225, 235]);
}

t.draw(() => {
	const [r, g, b, a] = color.rgba;
	const offset = Math.min(11, Math.max(8, Math.floor(t.grid.cols / 4)));

	t.background(12, 16, 24);

	drawCenteredText('RGBA', -7, [180, 190, 220]);
	drawCenteredText(`[${r}, ${g}, ${b}, ${a}]`, -5, [230, 235, 245]);

	drawSwatch(-offset, 'RGBA 255', [r, g, b], 255);
	drawSwatch(offset, `RGBA ${a}`, [r, g, b], a);

	drawCenteredText('alpha changes opacity', 7, [170, 180, 205]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
