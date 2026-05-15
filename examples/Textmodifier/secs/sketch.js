/**
 * @title Textmodifier.secs
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

	const time = t.secs;
	const radius = 15;

	const x = Math.cos(time * 1.5) * radius;
	const y = Math.sin(time * 2.0) * radius * 0.5;

	t.push();
	t.translate(x, y);
	t.char('☼');
	t.charColor(255, 200, 100);
	t.rect(5, 5);
	t.pop();

	// Trail indicating previous seconds
	for (let i = 1; i <= 10; i++) {
		const pastTime = time - i * 0.1;
		const px = Math.cos(pastTime * 1.5) * radius;
		const py = Math.sin(pastTime * 2.0) * radius * 0.5;

		t.push();
		t.translate(px, py);
		t.char('·');
		t.charColor(100, 150, 255, (1 - i / 10) * 150);
		t.point();
		t.pop();
	}

	drawCenteredText('Textmodifier.secs', -12, [255, 255, 255]);
	drawCenteredText('The elapsed time in seconds since the sketch started.', -10, [150, 170, 200]);
	drawCenteredText(`t.secs = ${t.secs.toFixed(3)}`, 10, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
