/**
 * @title Textmodifier.translateY
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

	const time = t.frameCount * 0.05;
	const yPos = Math.sin(time) * 12;

	t.push();
	t.charColor(60, 70, 100);
	t.translate(0, -15);
	t.char('|');
	t.rect(1, 30);
	t.pop();

	t.push();
	t.translateY(yPos);

	const currentY = t.translateY();

	t.charColor(255, 140, 180);
	t.char('Y');
	t.rect(5, 5);

	t.push();
	t.translate(4, 0);
	const label = `Y: ${currentY.toFixed(1)}`;
	t.charColor(255);
	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(label[i]);
		t.point();
		t.pop();
	}
	t.pop();
	t.pop();

	drawCenteredText('Textmodifier.translateY', -12, [255, 255, 255]);
	drawCenteredText('Sets or returns the vertical translation.', -10, [150, 170, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
