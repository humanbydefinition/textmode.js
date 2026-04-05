/**
 * @title Textmodifier.grid
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const { cols, rows } = t.grid;
	const time = t.frameCount * 0.05;

	for (let y = -Math.floor(rows / 2); y < Math.floor(rows / 2); y++) {
		for (let x = -Math.floor(cols / 2); x < Math.floor(cols / 2); x++) {
			const distance = Math.sqrt(x * x + y * y);
			const ripple = Math.sin(distance * 0.4 - time);
			const charIndex = Math.floor((ripple + 1) * 2);
			const glyph = ['.', ':', '-', '=', '#'][charIndex] || '#';

			t.push();
			t.translate(x + 0.5, y + 0.5);
			t.char(glyph);
			t.charColor(100 + ripple * 155, 150 + ripple * 50, 255);
			t.point();
			t.pop();
		}
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
