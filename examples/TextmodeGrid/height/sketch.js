/**
 * @title TextmodeGrid.height
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const label = `${t.grid.height}px`;

	for (let i = 0; i < t.grid.rows; i++) {
		const y = i - t.grid.rows / 2;
		const brightness = Math.abs(y / (t.grid.rows / 2)) * 255;

		t.push();
		t.translate(0, y);
		t.char('|');
		t.charColor(255, 100, 255 - brightness);
		t.point();
		t.pop();
	}

	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i - label.length / 2, 0);
		t.char(label[i]);
		t.cellColor(0);
		t.charColor(255);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
