/**
 * @title TextmodeCamera.copy
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

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.draw(() => {
	t.background(6, 10, 22);

	const original = t.createCamera().setPosition(-10, 5, 20).lookAt(0, 0, 0);
	const clone = original.copy().setPosition(10, 5, 20);

	const active = Math.floor(t.frameCount / 120) % 2 === 0 ? original : clone;
	t.setCamera(active);

	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate((i - 1) * 8, 0, -i * 6);
		t.char(['A', 'B', 'C'][i]);
		t.charColor(120 + i * 40, 180, 255);
		t.ellipse(4, 3);
		t.pop();
	}

	t.resetCamera();

	drawCenteredText('TextmodeCamera.copy', -8, [240, 245, 255]);
	drawCenteredText('original: ' + original.eyeX + ', ' + original.eyeY + ', ' + original.eyeZ, 6, [180, 200, 220]);
	drawCenteredText('clone: ' + clone.eyeX + ', ' + clone.eyeY + ', ' + clone.eyeZ, 10, [80, 255, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
