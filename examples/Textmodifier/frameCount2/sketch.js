/**
 * @title Textmodifier.frameCount2
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

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
		t.frameCount = 0;
	}
});

t.draw(() => {
	t.background(0);

	const angle = t.frameCount * 0.08;
	const x = Math.cos(angle) * 18;
	const y = Math.sin(angle) * 8;

	t.push();
	t.translate(x, y);
	t.char('@');
	t.charColor(255, 180, 80);
	t.rect(4, 4);
	t.pop();

	drawLabel('press SPACE to reset frameCount', -12);
	drawLabel(`frameCount: ${t.frameCount}`, -9);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
