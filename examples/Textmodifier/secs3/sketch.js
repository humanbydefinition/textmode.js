/**
 * @title Textmodifier.secs3
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawCenteredText(text, row, rgb = [240, 245, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), row);
	t.charColor(rgb[0], rgb[1], rgb[2]);
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
	t.background(6, 10, 22);

	const barWidth = 40;
	const startX = -Math.floor(barWidth / 2);

	// Scrubbing logic: Override t.secs while holding mouse button
	if (t.mouseIsPressed && t.mouse.x !== Number.NEGATIVE_INFINITY) {
		const progress = (t.mouse.x - startX) / barWidth;
		const scrub = progress * 10;
		t.secs = Math.max(0, Math.min(10, scrub));
		t.cursor('grabbing');
	} else {
		t.cursor('default');
	}

	const time = t.secs;
	const length = 15;
	const angle = Math.sin(time * 2) * 60; // Pendulum swing

	t.push();
	t.rotateZ(angle);
	t.charColor(60, 70, 100);
	t.char('|');
	t.rect(1, length);

	t.translate(0, length);
	t.char('O');
	t.charColor(255, 140, 180);
	t.ellipse(8, 8);
	t.pop();

	drawCenteredText('Textmodifier.secs (Time Scrubbing)', -18, [255, 255, 255]);
	drawCenteredText('Hold Click and drag horizontally to scrub time.', -16, [150, 170, 200]);
	drawCenteredText(`t.secs = ${t.secs.toFixed(2)}s`, 12, [255, 140, 180]);

	t.push();
	t.translate(0, 15);
	t.charColor(40, 45, 60);
	t.char('-');
	t.rect(barWidth, 1);

	t.translate(Math.floor((t.secs / 10) * barWidth) + startX, 0);
	t.char('^');
	t.charColor(255);
	t.point();
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
