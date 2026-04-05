/**
 * @title TextmodeGrid.reset
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let locked = false;

t.draw(() => {
	t.background(0);
	t.charColor(255);
	t.char(locked ? 'L' : 'R');
	t.rect(t.grid.cols, t.grid.rows);
});

t.mousePressed(() => {
	locked = !locked;

	if (locked) {
		t.grid.cols = 20;
		t.grid.rows = 10;
		return;
	}

	t.grid.responsive();
	t.grid.reset();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
