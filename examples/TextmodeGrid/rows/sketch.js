/**
 * @title TextmodeGrid.rows
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

	const rows = t.grid.rows;
	const halfHeight = Math.floor(rows / 2);

	for (let y = -halfHeight; y < halfHeight; y++) {
		t.push();
		t.translate(0, y);

		const isMarker = (y + halfHeight) % 5 === 0;

		if (isMarker) {
			t.char('-');
			t.charColor(140, 180, 255, 180);
		} else {
			t.char('|');
			t.charColor(60, 70, 100, 100);
		}

		t.point();
		t.pop();
	}

	t.push();
	t.charColor(255, 255, 255);
	t.translate(0, -halfHeight);
	t.char('^');
	t.point();
	t.translate(0, rows - 1);
	t.char('v');
	t.point();
	t.pop();

	drawCenteredText('TextmodeGrid.rows', -12, [240, 245, 255]);
	drawCenteredText(`${rows} ROWS`, 12, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
