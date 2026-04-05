/**
 * @title TextmodeGrid.offsetX
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const text = `X MARGIN: ${t.grid.offsetX}px`;

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i - text.length / 2, -2);
		t.char(text[i]);
		t.charColor(200, 200, 255);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
