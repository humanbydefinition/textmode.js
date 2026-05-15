/**
 * @title TextmodeGrid.width
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

	const w = t.grid.width;
	const cols = t.grid.cols;
	const halfWidth = Math.floor(cols / 2);

	t.push();
	t.translate(0, 0);
	t.char('=');
	t.charColor(255, 140, 180, 100);
	t.rect(cols, 1);
	t.pop();

	t.push();
	t.charColor(255, 255, 255);
	t.translate(-halfWidth, 0);
	t.char('[');
	t.point();
	t.translate(cols - 1, 0);
	t.char(']');
	t.point();
	t.pop();

	drawCenteredText('TextmodeGrid.width', -8, [240, 245, 255]);
	drawCenteredText(`${w} PIXELS`, 6, [255, 140, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
