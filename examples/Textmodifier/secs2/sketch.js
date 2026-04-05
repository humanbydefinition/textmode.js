/**
 * @title Textmodifier.secs2
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
		t.secs += 2;
	}
});

t.draw(() => {
	t.background(0);

	const loopDuration = 5;
	const progress = (t.secs % loopDuration) / loopDuration;
	const x = (progress - 0.5) * t.grid.cols;

	t.push();
	t.translate(x, 0);
	t.char('>');
	t.charColor(50, 255, 100);
	t.rect(4, 4);
	t.pop();

	drawLabel('press SPACE to add 2 secs', -12);
	drawLabel(`secs: ${t.secs.toFixed(2)}`, -9);
});
