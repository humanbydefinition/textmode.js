/**
 * @title TextmodeGrid.setCols
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.setup(() => {
	t.grid.cols = 40;
});

t.draw(() => {
	t.background(0, 20, 0);

	for (let x = -20; x < 20; x++) {
		const height = 5 + Math.sin(t.frameCount * 0.1 + x * 0.5) * 5;

		t.push();
		t.translate(x + 0.5, 0);
		t.charColor(0, 255, 100);
		t.char('+');
		t.rect(1, height);
		t.pop();
	}

	const label = `LOCKED: ${t.grid.cols} COLS`;
	t.charColor(255);

	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i - label.length / 2, 10);
		t.char(label[i]);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
