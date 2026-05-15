/**
 * @title Textmodifier.rotateZ
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

	const time = t.frameCount * 2;
	let angle = time;

	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		angle = Math.atan2(t.mouse.y, t.mouse.x) * (180 / Math.PI);
	}

	t.push();
	t.charColor(40, 50, 80);
	for (let i = 0; i < 8; i++) {
		t.push();
		t.rotateZ(i * 45);
		t.char('-');
		t.translate(15, 0);
		t.rect(20, 1);
		t.pop();
	}
	t.pop();

	t.push();
	t.rotateZ(angle);
	const currentAngle = t.rotateZ();
	t.charColor(255, 140, 180);
	t.char('+');
	t.rect(20, 20);
	t.pop();

	drawCenteredText(`Current Z-Angle: ${Math.floor(currentAngle % 360)}°`, 12, [255, 225, 140]);

	drawCenteredText('Textmodifier.rotateZ', -18, [255, 255, 255]);
	drawCenteredText('Rotates the coordinate system around the Z-axis (Roll).', -16, [150, 170, 200]);
	drawCenteredText('t.rotateZ(degrees)', 18, [140, 180, 255]);

	if (t.mouse.x === Number.NEGATIVE_INFINITY) {
		drawCenteredText('Move mouse to control angle', 21, [100, 100, 120]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
