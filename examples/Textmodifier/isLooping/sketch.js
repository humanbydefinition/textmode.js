/**
 * @title Textmodifier.isLooping
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

t.mousePressed(() => {
	if (t.isLooping()) {
		t.noLoop();
		t.redraw();
	} else {
		t.loop();
	}
});

t.draw(() => {
	t.background(0);

	t.push();
	t.rotateZ(t.frameCount * 5);
	t.char(t.isLooping() ? '>' : '|');
	t.charColor(t.isLooping() ? 0 : 255, t.isLooping() ? 255 : 100, 100);
	t.rect(10, 10);
	t.pop();

	drawLabel(`isLooping(): ${t.isLooping()}`, -12);
	drawLabel('click to toggle loop state', -9);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
