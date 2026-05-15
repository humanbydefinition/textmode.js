/**
 * @title Textmodifier.charRotation
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let currentAngle = 0;

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.cellColor(0, 0, 0, 0);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

labelLayer.draw(() => {
	t.clear();

	drawCenteredText('Textmodifier.charRotation', -12, [240, 245, 255]);
	drawCenteredText('Rotating individual characters within their grid cells.', -10, [150, 170, 200]);

	drawCenteredText('ROTATION GAUGE', 10, [140, 255, 180]);
	drawCenteredText(`ANGLE: ${currentAngle.toFixed(1).padStart(5, '0')} DEG`, 12, [140, 180, 255]);

	drawCenteredText('t.charRotation(degrees)', 15, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 1.5;
	const angle = time % 360;

	t.charRotation(angle);

	currentAngle = t.charRotation();

	t.push();
	t.charRotation(0); // Ensure crosshair is static
	t.charColor(60, 70, 100);
	t.char('.');
	t.line(-10, 0, 10, 0);
	t.line(0, -6, 0, 6);

	drawCenteredText('N', -8, [60, 70, 100]);
	drawCenteredText('S', 8, [60, 70, 100]);
	t.translate(-12, 0);
	t.char('W');
	t.point();
	t.translate(24, 0);
	t.char('E');
	t.point();
	t.pop();

	t.push();
	t.charColor(255, 180, 100);
	t.char('+');
	t.rect(10, 6);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
