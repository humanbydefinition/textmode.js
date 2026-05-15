/**
 * @title TextmodeGrid.height
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

	const h = t.grid.height;
	const rows = t.grid.rows;
	const halfHeight = Math.floor(rows / 2);

	t.push();
	t.translate(0, 0);
	t.char('|');
	t.charColor(255, 140, 180, 100);
	t.rect(1, rows);
	t.pop();

	t.push();
	t.charColor(255, 255, 255);
	t.translate(0, -halfHeight);
	t.char('-');
	t.point();
	t.translate(0, rows - 1);
	t.char('-');
	t.point();
	t.pop();

	drawCenteredText('TextmodeGrid.height', -12, [240, 245, 255]);
	drawCenteredText(`${h} PIXELS`, 12, [255, 140, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
