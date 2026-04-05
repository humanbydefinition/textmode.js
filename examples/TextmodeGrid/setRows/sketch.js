/**
 * @title TextmodeGrid.setRows
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.setup(() => {
	t.grid.rows = 15;
});

t.draw(() => {
	t.background(20, 0, 40);

	for (let y = -7; y <= 7; y++) {
		const brightness = 127 + 127 * Math.sin(t.frameCount * 0.1 + y);

		t.push();
		t.translate(0, y);
		t.charColor(brightness, 100, 255);
		t.char('=');
		t.rect(t.grid.cols, 1);
		t.pop();
	}

	const label = `LOCKED: ${t.grid.rows} ROWS`;
	t.charColor(255, 255, 0);

	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i - label.length / 2, 0);
		t.char(label[i]);
		t.cellColor(0);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
