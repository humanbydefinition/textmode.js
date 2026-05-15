/**
 * @title TextmodeGrid.offsetX
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

	const offset = t.grid.offsetX;
	const cols = t.grid.cols;
	const halfWidth = Math.floor(cols / 2);

	t.push();
	t.translate(-halfWidth, 0);
	t.charColor(140, 255, 220, 150);
	t.char('|');
	t.rect(1, 7);

	t.push();
	t.translate(-2, 0);
	t.char('<');
	t.point();
	t.translate(-1, 0);
	t.char('-');
	t.point();
	t.pop();
	t.pop();

	t.push();
	t.char('.');
	t.charColor(60, 70, 100, 80);
	t.translate(0, 0);
	t.rect(cols, 1);
	t.pop();

	// They will overwrite/clip the lines if they occupy the same cells
	drawCenteredText('TextmodeGrid.offsetX', -8, [240, 245, 255]);
	drawCenteredText('Horizontal margin from canvas edge to grid.', -6, [150, 170, 200]);
	drawCenteredText(`${offset} PX`, 4, [140, 255, 220]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
