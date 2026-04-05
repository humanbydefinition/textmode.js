/**
 * @title Textmodifier.secs3
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
		t.secs = Math.max(0, Math.min(5, progress * 5));
		t.cursor('grabbing');
	} else {
		t.cursor('default');
	}

	const length = Math.min(t.grid.rows, t.grid.cols) * 0.35;
	const angle = Math.sin(t.secs * 3) * Math.PI * 0.3;
	const bobX = Math.sin(angle) * length;
	const bobY = Math.cos(angle) * length;

	t.charColor(80);
	t.char('.');
	t.line(0, 0, bobX, bobY);

	for (let i = 1; i <= 4; i++) {
		const lag = i * 0.08;
		const echoAngle = Math.sin((t.secs - lag) * 3) * Math.PI * 0.3;

		t.push();
		t.translate(Math.sin(echoAngle) * length, Math.cos(echoAngle) * length);
		t.char('o');
		t.charColor(50, 100, 255, 100 - i * 20);
		t.ellipse(6 - i, 6 - i);
		t.pop();
	}

	t.push();
	t.translate(bobX, bobY);
	t.char('O');
	t.charColor(255, 100 + Math.abs(Math.cos(t.secs * 3)) * 155, 50);
	t.ellipse(8, 8);
	t.pop();

	drawLabel('hold SPACE and move mouse to set secs', Math.floor(t.grid.rows / 2) - 3);
	drawLabel(`${t.secs.toFixed(2)} secs`, Math.floor(t.grid.rows / 2) - 1);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
