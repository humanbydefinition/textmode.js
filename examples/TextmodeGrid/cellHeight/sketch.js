/**
 * @title TextmodeGrid.cellHeight
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const rows = t.grid.rows;
	const label = `CELL H: ${t.grid.cellHeight}px`;

	for (let y = -rows / 2; y < rows / 2; y++) {
		const brightness = 100 + (Math.sin(y * 0.2 + t.frameCount * 0.1) * 0.5 + 0.5) * 155;

		t.cellColor(0, brightness * 0.5, brightness);
		t.push();
		t.translate(0, y);
		t.char('=');
		t.charColor(255);
		t.point();
		t.pop();
	}

	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i - label.length / 2, 0);
		t.char(label[i]);
		t.cellColor(0);
		t.charColor(255, 255, 0);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
