/**
 * @title TextmodeGrid.offsetY
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

	const offset = t.grid.offsetY;
	const rows = t.grid.rows;
	const halfHeight = Math.floor(rows / 2);

	t.push();
	t.translate(0, -halfHeight);
	t.charColor(255, 180, 140, 150);
	t.char('-');
	t.rect(11, 1);

	t.push();
	t.translate(0, -2);
	t.char('^');
	t.point();
	t.translate(0, -1);
	t.char('|');
	t.point();
	t.pop();
	t.pop();

	t.push();
	t.char('.');
	t.charColor(60, 70, 100, 80);
	t.translate(0, 0);
	t.rect(1, rows);
	t.pop();

	drawCenteredText('TextmodeGrid.offsetY', -12, [240, 245, 255]);
	drawCenteredText('Vertical margin from canvas edge to grid.', -10, [150, 170, 200]);
	drawCenteredText(`${offset} PX`, 4, [255, 180, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
