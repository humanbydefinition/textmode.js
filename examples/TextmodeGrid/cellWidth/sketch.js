/**
 * @title TextmodeGrid.cellWidth
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

	const w = t.grid.cellWidth;

	drawCenteredText('TextmodeGrid.cellWidth', -8, [240, 245, 255]);
	drawCenteredText(`${w} PIXELS`, 6, [120, 255, 180]);

	for (let x = -3; x <= 3; x++) {
		const isTarget = x === 0;

		t.push();
		t.translate(x, 0);

		if (isTarget) {
			t.char('#');
			t.charColor(120, 255, 180);

			t.push();
			t.translate(0, -3);
			t.char('v');
			t.point();
			t.translate(0, 6);
			t.char('^');
			t.point();
			t.pop();
		} else {
			t.char('.');
			t.charColor(100, 120, 150);
		}

		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
