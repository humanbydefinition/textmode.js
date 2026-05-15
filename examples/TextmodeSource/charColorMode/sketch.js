/**
 * @title TextmodeSource.charColorMode
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let sourceA, sourceB;

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

function createGradientCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 128;
	canvas.height = 128;
	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	const grad = ctx.createLinearGradient(0, 0, 128, 128);
	grad.addColorStop(0, '#ffcc00');
	grad.addColorStop(0.5, '#ff0055');
	grad.addColorStop(1, '#3300ff');
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, 128, 128);

	return canvas;
}

t.setup(() => {
	const canvas = createGradientCanvas();

	sourceA = t.createTexture(canvas);
	sourceA.characters(' .:-=+*#%@');
	sourceA.charColorMode('sampled');

	sourceB = t.createTexture(canvas);
	sourceB.characters(' .:-=+*#%@');
	sourceB.charColorMode('fixed').charColor(140, 255, 180);
});

t.draw(() => {
	t.background(6, 10, 22);

	if (!sourceA || !sourceB) return;

	drawCenteredText('TextmodeSource.charColorMode', -12, [240, 245, 255]);
	drawCenteredText('Determines if characters use source colors or a fixed override.', -10, [150, 170, 200]);

	const imgW = 20;
	const imgH = 12;

	t.push();
	t.translate(-12, 0);
	t.image(sourceA, imgW, imgH);
	t.pop();
	drawCenteredText("MODE: 'sampled'", 8, [140, 180, 255]);

	t.push();
	t.translate(12, 0);
	t.image(sourceB, imgW, imgH);
	t.pop();
	drawCenteredText("MODE: 'fixed'", 12, [255, 180, 100]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
