/**
 * @title Textmodifier.font
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const font = t.font;
	const count = font.characters.length;
	const info = `FONT CHARS: ${count}`;
	const barWidth = Math.min(Math.ceil(count / 10), t.grid.cols - 4);

	t.char('░');
	t.charColor(100, 100, 100);
	t.rect(barWidth + 2, 5);

	t.char('█');
	t.charColor(0, 150, 255);
	t.rect(barWidth, 3);

	for (let i = 0; i < info.length; i++) {
		t.push();
		t.translate(i - info.length / 2, 0);
		t.char(info[i]);
		t.cellColor(0);
		t.charColor(255);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
