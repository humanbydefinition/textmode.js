/**
 * @title Textmodifier.translateZ
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

	const time = t.frameCount * 0.03;
	const zPos = Math.sin(time) * 40;

	t.push();
	t.charColor(40, 50, 80);
	for (let i = -2; i <= 2; i++) {
		t.push();
		t.translate(i * 10, 0, 0);
		t.char('|');
		t.rect(1, 40);
		t.pop();
		t.push();
		t.translate(0, i * 10, 0);
		t.char('-');
		t.rect(40, 1);
		t.pop();
	}
	t.pop();

	t.push();
	t.translateZ(zPos);

	const currentZ = t.translateZ();

	// Fade based on depth
	const alpha = 255 * (1 - (currentZ + 40) / 120);
	t.charColor(140, 180, 255, alpha);
	t.char('Z');
	t.rect(8, 8);

	t.push();
	t.translate(0, 6);
	const label = `Z: ${currentZ.toFixed(1)}`;
	t.translate(-Math.floor(label.length / 2), 0);
	t.charColor(255, 255, 255, alpha);
	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(label[i]);
		t.point();
		t.pop();
	}
	t.pop();
	t.pop();

	drawCenteredText('Textmodifier.translateZ', -12, [255, 255, 255]);
	drawCenteredText('Sets or returns the depth (Z) translation.', -10, [150, 170, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
