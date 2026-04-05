/**
 * @title TextmodeGrid.cellWidth
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const label = `${t.grid.cellWidth}x${t.grid.cellHeight}`;

	t.char('▓');
	t.charColor(255, 100, 100);
	t.rect(11, 11);

	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i - label.length / 2, 0);
		t.char(label[i]);
		t.charColor(255);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
