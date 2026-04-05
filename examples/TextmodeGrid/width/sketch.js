/**
 * @title TextmodeGrid.width
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const percent = (t.grid.width / window.innerWidth) * 100;
	const text = `Grid covers ${percent.toFixed(1)}% of width`;

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i - text.length / 2, 0);
		t.char(text[i]);
		t.charColor(0, 255, 255);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
