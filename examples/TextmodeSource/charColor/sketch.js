/**
 * @title TextmodeSource.charColor
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let techSource;

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
	techSource = await t.loadImage(IMAGE_URL);
	techSource.characters(' .:-=+*#%@');
	techSource.charColorMode('fixed');
});

t.draw(() => {
	t.background(6, 10, 22);

	if (!techSource) return;

	const time = t.frameCount * 0.04;
	const r = Math.round(150 + 105 * Math.sin(time));
	const g = Math.round(150 + 105 * Math.cos(time * 0.7));

	techSource.charColor(r, g, 100);

	drawCenteredText('TextmodeSource.charColor', -12, [240, 245, 255]);
	drawCenteredText('Overriding the character color of every cell in a source.', -10, [150, 170, 200]);

	t.push();
	t.translate(0, 0);
	t.image(techSource, 24, 14);
	t.pop();

	drawCenteredText('MODE: FIXED', 9, [140, 255, 180]);
	drawCenteredText(`CHAR_COLOR: [${r}, ${g}, 100]`, 11, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
