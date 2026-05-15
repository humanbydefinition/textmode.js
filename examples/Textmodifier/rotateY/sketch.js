/**
 * @title Textmodifier.rotateY
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
		angle = t.mouse.x * 10;
	}

	t.push();
	t.charColor(40, 50, 80);
	for (let i = -2; i <= 2; i++) {
		t.push();
		t.translate(i * 15, 0, 0);
		t.char('|');
		t.rect(1, 40);
		t.pop();
	}
	t.pop();

	t.push();
	t.rotateY(angle);
	const currentAngle = t.rotateY();
	const side = Math.cos((currentAngle * Math.PI) / 180);
	t.charColor(100, 200, 255);
	t.char(Math.abs(side) > 0.2 ? '█' : '│');
	t.rect(15, 30);
	t.pop();

	drawCenteredText(`Current Y-Angle: ${Math.floor(currentAngle % 360)}°`, 12, [255, 225, 140]);

	drawCenteredText('Textmodifier.rotateY', -18, [255, 255, 255]);
	drawCenteredText('Rotates the coordinate system around the Y-axis (Yaw).', -16, [150, 170, 200]);
	drawCenteredText('t.rotateY(degrees)', 18, [140, 180, 255]);

	if (t.mouse.x === Number.NEGATIVE_INFINITY) {
		drawCenteredText('Move mouse X to control rotation', 21, [100, 100, 120]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
