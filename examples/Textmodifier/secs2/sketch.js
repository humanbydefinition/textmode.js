/**
 * @title Textmodifier.secs2
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

t.keyPressed((data) => {
	if (data.key === ' ') {
		// You can manually add to t.secs to "skip" time forward
		t.secs += 1.0;
	}
});

t.draw(() => {
	t.background(6, 10, 22);

	const cycle = 4.0;
	const progress = (t.secs % cycle) / cycle;

	const barWidth = 50;
	const startX = -Math.floor(barWidth / 2);
	const x = startX + progress * barWidth;

	t.push();
	t.charColor(40, 45, 60);
	t.char('-');
	t.rect(barWidth, 1);
	t.pop();

	t.push();
	t.translate(Math.floor(x), 0);
	t.char('>');
	t.charColor(100, 255, 150);
	t.rect(4, 4);
	t.pop();

	drawCenteredText('Textmodifier.secs (Time Manipulation)', -12, [255, 255, 255]);
	drawCenteredText('t.secs is a read-write property.', -10, [150, 170, 200]);
	drawCenteredText('Press SPACE to jump 1.0s ahead', 10, [100, 255, 150]);
	drawCenteredText(`Current Time: ${t.secs.toFixed(2)}s`, 12, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
