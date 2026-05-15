/**
 * @title TextmodeLayer.rotateZ
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const scannerLayer = t.layers.add({ blendMode: 'additive' });

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

	const time = t.frameCount * 1.5;
	const angle = time % 360;

	scannerLayer.rotateZ(angle);

	t.push();
	t.charColor(60, 70, 100);
	t.char('.');
	t.line(-15, 0, 15, 0);
	t.line(0, -8, 0, 8);
	t.pop();

	drawCenteredText('TextmodeLayer.rotateZ', -12, [240, 245, 255]);
	drawCenteredText('Rotating the entire layer coordinate system in degrees.', -10, [150, 170, 200]);

	drawCenteredText(`ANGLE: ${angle.toFixed(1).padStart(5, '0')} DEG`, 10, [140, 180, 255]);
});

scannerLayer.draw(() => {
	t.clear();

	t.push();
	t.charColor(140, 180, 255, 200);
	t.char('#');
	t.rect(20, 1);
	t.pop();

	t.push();
	t.translate(10, 0);
	t.char('>');
	t.charColor(255, 225, 140);
	t.point();
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
