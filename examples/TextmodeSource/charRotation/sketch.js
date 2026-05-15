/**
 * @title TextmodeSource.charRotation
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let pointerSource;

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

function createPointerCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 128;
	canvas.height = 128;
	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, 128, 128);

	ctx.fillStyle = '#ffffff';
	ctx.beginPath();
	ctx.moveTo(64, 20); // Top
	ctx.lineTo(100, 100); // Bottom Right
	ctx.lineTo(28, 100); // Bottom Left
	ctx.closePath();
	ctx.fill();

	return canvas;
}

t.setup(() => {
	const canvas = createPointerCanvas();
	pointerSource = t.createTexture(canvas);
	pointerSource.characters('#+- ');
});

t.draw(() => {
	t.background(6, 10, 22);

	if (!pointerSource) return;

	drawCenteredText('TextmodeSource.charRotation', -12, [240, 245, 255]);
	drawCenteredText('Rotating the individual characters within their cells.', -10, [150, 170, 200]);

	const imgW = 20;
	const imgH = 12;

	t.push();
	t.translate(-12, 0);
	pointerSource.charRotation(0);
	t.image(pointerSource, imgW, imgH);
	t.pop();
	drawCenteredText('0 DEGREES', 8, [140, 180, 255]);

	t.push();
	t.translate(12, 0);
	pointerSource.charRotation(90);
	t.image(pointerSource, imgW, imgH);
	t.pop();
	drawCenteredText('90 DEGREES', 12, [255, 180, 100]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
