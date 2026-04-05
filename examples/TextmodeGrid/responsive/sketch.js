/**
 * @title TextmodeGrid.responsive
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let isLocked = false;

t.draw(() => {
	t.background(0);
	t.charColor(isLocked ? t.color(255, 100, 100) : t.color(100, 255, 100));
	t.char(isLocked ? 'L' : 'R');
	t.rect(t.grid.cols - 2, t.grid.rows - 2);

	const message = isLocked ? 'LOCKED (Fixed 26x10)' : 'RESPONSIVE (Auto-size)';

	for (let i = 0; i < message.length; i++) {
		t.push();
		t.translate(i - message.length / 2, 0);
		t.char(message[i]);
		t.cellColor(0);
		t.point();
		t.pop();
	}
});

t.mousePressed(() => {
	isLocked = !isLocked;

	if (isLocked) {
		t.grid.cols = 26;
		t.grid.rows = 10;
		return;
	}

	t.grid.responsive();
	t.grid.reset();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
