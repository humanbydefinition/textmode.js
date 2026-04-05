/**
 * @title TextmodeGrid.creation
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.setup(() => {
	t.grid.cols = 40;
	t.grid.rows = 25;
});

t.draw(() => {
	t.background(0);
	t.charColor(0, 255, 0);
	t.char('#');
	t.rect(t.grid.cols, t.grid.rows);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
