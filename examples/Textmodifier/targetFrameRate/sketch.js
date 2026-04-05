/**
 * @title Textmodifier.targetFrameRate
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

function drawLabel(text, y) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(200);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.draw(() => {
	t.background(0);

	const fps = 32.5 + Math.sin(Date.now() * 0.001) * 27.5;
	t.targetFrameRate(fps);

	const pulse = Math.sin(t.frameCount * 0.1) * 10 + 15;

	t.charColor(255, 100, 200);
	t.char('O');
	t.ellipse(pulse, pulse);

	t.charColor(255);
	t.char('.');
	t.ellipse(pulse * 0.6, pulse * 0.6);

	t.push();
	t.translate(0, Math.floor(t.grid.rows / 2) - 3);
	t.charColor(0, 255, 100);
	t.char('|');
	t.rect(fps * 0.5, 1);
	t.pop();

	drawLabel(`targetFrameRate: ${t.targetFrameRate().toFixed(1)}`, Math.floor(t.grid.rows / 2) - 1);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
