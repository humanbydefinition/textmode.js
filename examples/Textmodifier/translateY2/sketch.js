/**
 * @title Textmodifier.translateY2
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

	const count = 40;
	const speed = 0.5;

	// Cascading elements using translateY
	for (let i = 0; i < count; i++) {
		const x = (i / count - 0.5) * 60;
		const offset = (i * 7.5) % 30;
		const y = ((t.frameCount * speed + offset) % 30) - 15;

		t.push();
		t.translateX(x);
		t.translateY(y);

		const brightness = (1 - (y + 15) / 30) * 255;
		t.charColor(255, 140, 180, brightness);
		t.char('|');
		t.point();
		t.pop();
	}

	drawCenteredText('Textmodifier.translateY (Cascading)', -16, [255, 255, 255]);
	drawCenteredText('Simulating vertical motion with wrapping translateY.', -14, [150, 170, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
