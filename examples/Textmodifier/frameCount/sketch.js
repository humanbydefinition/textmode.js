/**
 * @title Textmodifier.frameCount
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
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

	const blinkOn = t.frameCount % 60 < 30;

	t.push();
	t.rotateZ(t.frameCount * 2);
	t.charColor(255);
	t.cellColor(120, 40, 60);
	t.char('X');
	t.rect(10, 10);
	t.pop();

	if (blinkOn) {
		t.push();
		t.translate(15, 0);
		t.charColor(100, 200, 255);
		t.cellColor(20, 40, 80);
		t.char('O');
		t.rect(5, 5);
		t.pop();
	}

	drawCenteredText('Textmodifier.frameCount', -12, [240, 245, 255]);
	drawCenteredText('Read-only counter incremented each frame.', -10, [150, 170, 200]);

	drawCenteredText(`t.frameCount = ${t.frameCount}`, -7, [140, 180, 255]);

	drawCenteredText('t.rotateZ(t.frameCount * 2)  ->  continuous rotation', -4, [255, 200, 100]);

	drawCenteredText(
		blinkOn ? 't.frameCount % 60 < 30  ->  visible (30 frames)' : 't.frameCount % 60 < 30  ->  hidden (30 frames)',
		11,
		blinkOn ? [140, 255, 180] : [255, 100, 100]
	);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
