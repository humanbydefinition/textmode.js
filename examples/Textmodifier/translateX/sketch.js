/**
 * @title Textmodifier.translateX
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
	const xPos = Math.sin(time) * 20;

	t.push();
	t.charColor(60, 70, 100);
	t.translate(-30, 0);
	t.char('-');
	t.rect(60, 1);
	t.pop();

	t.push();
	t.translateX(xPos);

	const currentX = t.translateX();

	t.charColor(120, 255, 180);
	t.char('X');
	t.rect(5, 5);

	t.push();
	t.translate(0, 4);
	const label = `X: ${currentX.toFixed(1)}`;
	t.translate(-Math.floor(label.length / 2), 0);
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

	drawCenteredText('Textmodifier.translateX', -12, [255, 255, 255]);
	drawCenteredText('Sets or returns the horizontal translation.', -10, [150, 170, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
