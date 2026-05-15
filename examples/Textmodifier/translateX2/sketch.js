/**
 * @title Textmodifier.translateX2
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

	const time = t.frameCount * 0.04;
	const count = 30;

	// Multiple elements oscillating in X
	for (let i = 0; i < count; i++) {
		const phase = i / count;
		const y = (phase - 0.5) * 30;
		const xOffset = Math.sin(time + phase * 6) * 20;

		t.push();
		t.translateY(y);
		t.translateX(xOffset);

		t.charColor(120, 255, 180, (phase * 0.8 + 0.2) * 255);
		t.char('█');
		t.rect(4, 1);
		t.pop();
	}

	drawCenteredText('Textmodifier.translateX (Field)', -16, [255, 255, 255]);
	drawCenteredText('Applying individual X translations to multiple layers.', -14, [150, 170, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
