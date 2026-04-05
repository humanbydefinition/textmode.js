/**
 * @title Textmodifier.millis3
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

function drawLabel(text, y) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(180);

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
		t.millis = 0;
	}
});

t.draw(() => {
	t.background(0);

	const duration = 3000;
	const elapsed = t.millis;
	const progress = (elapsed % duration) / duration;
	const barWidth = 40;
	const barHeight = 4;
	const width = barWidth * progress;

	t.charColor(64);
	t.char('-');
	t.rect(barWidth, barHeight);

	t.push();
	t.translate(-barWidth / 2 + width / 2, 0);
	t.char('=');
	t.charColor(100, 200, 255);
	t.rect(width, barHeight);
	t.pop();

	drawLabel('press SPACE to reset millis', -8);
	drawLabel(`${(elapsed / 1000).toFixed(1)}s`, -5);
});
