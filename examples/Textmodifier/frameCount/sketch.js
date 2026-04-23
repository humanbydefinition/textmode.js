/**
 * @title Textmodifier.frameCount
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

t.draw(() => {
	t.background(0);

	t.push();
	t.rotateZ(t.frameCount * 2);
	t.char('X');
	t.charColor(255);
	t.rect(10, 10);
	t.pop();

	if (t.frameCount % 60 < 30) {
		t.push();
		t.translate(15, 0);
		t.char('O');
		t.charColor(100, 200, 255);
		t.rect(5, 5);
		t.pop();
	}

	drawLabel(`frameCount: ${t.frameCount}`, -12);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
