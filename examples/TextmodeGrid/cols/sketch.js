/**
 * @title TextmodeGrid.cols
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const cols = t.grid.cols;
	const rows = t.grid.rows;

	t.char('#');
	t.charColor(255, 100, 100);
	t.rect(cols, rows);

	t.char(' ');
	t.cellColor(0);
	t.rect(cols - 2, rows - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
