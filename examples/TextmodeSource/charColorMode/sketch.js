/**
 * @title TextmodeSource.charColorMode
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
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

t.setup(async () => {
	sourceA = await t.loadImage(IMAGE_URL);
	sourceA.characters(' .:-=+*#%@');
	sourceA.charColorMode('sampled');

	sourceB = await t.loadImage(IMAGE_URL);
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
