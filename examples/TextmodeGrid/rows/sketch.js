/**
 * @title TextmodeGrid.rows
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const rows = t.grid.rows;

	for (let y = 0; y < rows; y++) {
		const brightness = (y / rows) * 255;

		t.cellColor(brightness, 0, 255 - brightness);
		t.push();
		t.translateY(y - rows / 2 + 0.5);
		t.rect(t.grid.cols, 1);
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
