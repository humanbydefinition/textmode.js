/**
 * @title Textmodifier.noLoop
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let paused = false;

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

	if (!paused && t.frameCount >= 120) {
		paused = true;
		t.noLoop();
	}

	t.push();
	t.rotateZ(t.frameCount * 3);
	t.char('A');
	t.charColor(paused ? 255 : 100, paused ? 100 : 255, 160);
	t.rect(14, 14);
	t.pop();

	drawLabel(paused ? 'paused by noLoop()' : 'auto-pause at frame 120', -12);
});
