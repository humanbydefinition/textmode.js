/**
 * @title Textmodifier.mouse
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawCenteredText(text, row, rgb = [240, 245, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), row);
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

	const mx = t.mouse.x;
	const my = t.mouse.y;
	const isInside = mx !== Number.NEGATIVE_INFINITY;

	if (isInside) {
		t.push();
		t.translate(mx, 0);
		t.charColor(40, 50, 80);
		t.char('|');
		t.rect(1, t.grid.rows);
		t.pop();

		t.push();
		t.translate(0, my);
		t.charColor(40, 50, 80);
		t.char('-');
		t.rect(t.grid.cols, 1);
		t.pop();

		t.push();
		t.translate(mx, my);
		t.char('☼');
		t.charColor(255, 200, 100);
		t.point();

		t.translate(2, 0);
		const coordText = `(${mx.toFixed(1)}, ${my.toFixed(1)})`;
		t.charColor(255);
		for (let i = 0; i < coordText.length; i++) {
			t.push();
			t.translate(i, 0);
			t.char(coordText[i]);
			t.point();
			t.pop();
		}
		t.pop();
	}

	drawCenteredText('Textmodifier.mouse', -20, [255, 255, 255]);
	drawCenteredText('A property holding the current mouse position in grid cells.', -18, [150, 170, 200]);
	drawCenteredText('Values are Number.NEGATIVE_INFINITY if outside the canvas.', -16, [150, 170, 200]);

	if (!isInside) {
		drawCenteredText('Move mouse into the canvas to track', 14, [100, 100, 120]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
