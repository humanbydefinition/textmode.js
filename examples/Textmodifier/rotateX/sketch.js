/**
 * @title Textmodifier.rotateX
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

	if (t.mouse.y !== Number.NEGATIVE_INFINITY) {
		angle = t.mouse.y * 10;
	}

	t.push();
	t.charColor(40, 50, 80);
	for (let i = -2; i <= 2; i++) {
		t.push();
		t.translate(0, i * 10, 0);
		t.char('-');
		t.rect(60, 1);
		t.pop();
	}
	t.pop();

	t.push();
	t.rotateX(angle);
	const currentAngle = t.rotateX();
	const intensity = Math.abs(Math.cos((currentAngle * Math.PI) / 180));
	t.charColor(120, 255, 180);
	t.char(intensity > 0.3 ? '█' : '▒');
	t.rect(30, 15);
	t.pop();

	drawCenteredText(`Current X-Angle: ${Math.floor(currentAngle % 360)}°`, 12, [255, 225, 140]);

	drawCenteredText('Textmodifier.rotateX', -18, [255, 255, 255]);
	drawCenteredText('Rotates the coordinate system around the X-axis (Pitch).', -16, [150, 170, 200]);
	drawCenteredText('t.rotateX(degrees)', 18, [140, 180, 255]);

	if (t.mouse.y === Number.NEGATIVE_INFINITY) {
		drawCenteredText('Move mouse Y to control rotation', 21, [100, 100, 120]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
