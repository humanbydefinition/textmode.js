/**
 * @title TextmodeGrid.cellHeight
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

	const h = t.grid.cellHeight;

	drawCenteredText('TextmodeGrid.cellHeight', -8, [240, 245, 255]);
	drawCenteredText(`${h} PIXELS`, 6, [255, 225, 140]);

	for (let y = -3; y <= 3; y++) {
		const isTarget = y === 0;

		t.push();
		t.translate(0, y);

		if (isTarget) {
			t.char('#');
			t.charColor(255, 225, 140);

			t.push();
			t.translate(-3, 0);
			t.char('>');
			t.point();
			t.translate(6, 0);
			t.char('<');
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
