/**
 * @title Textmodifier.millis4
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

	if (t.isKeyPressed(' ')) {
		const progress = (t.mouse.x + t.grid.cols / 2) / t.grid.cols;
		t.millis = Math.max(0, Math.min(10000, progress * 10000));
		t.cursor('ew-resize');
	} else {
		t.cursor('default');
	}

	const time = t.millis;
	const count = 120;
	const maxRadius = Math.min(t.grid.cols, t.grid.rows) * 0.35;

	for (let i = 0; i < count; i++) {
		const pct = i / count;
		const angle = i * 0.45 + time * 0.002;
		const radius = pct * maxRadius;

		t.push();
		t.translate(Math.cos(angle) * radius, Math.sin(angle) * radius);
		t.char(i % 3 === 0 ? 'O' : '.');
		t.charColor((time * 0.1 + i * 5) % 255, 255 - ((time * 0.1 + i * 5) % 255), 200);
		t.point();
		t.pop();
	}

	drawLabel('hold SPACE and move mouse to set millis', Math.floor(t.grid.rows / 2) - 3);
	drawLabel(`${Math.floor(t.millis)} ms`, Math.floor(t.grid.rows / 2) - 1);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
