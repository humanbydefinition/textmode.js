/**
 * @title TextmodeSource.cellColor
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
	techSource.charColorMode('fixed').charColor(255);
	techSource.cellColorMode('fixed');
});

t.draw(() => {
	t.background(6, 10, 22);

	if (!techSource) return;

	const time = t.frameCount * 0.04;
	const red = Math.round(40 + 40 * Math.sin(time));
	const blue = Math.round(80 + 40 * Math.cos(time * 0.7));

	techSource.cellColor(red, 40, blue);

	drawCenteredText('TextmodeSource.cellColor', -12, [240, 245, 255]);
	drawCenteredText('Overriding the background color of every cell in a source.', -10, [150, 170, 200]);

	t.push();
	t.translate(0, 0);
	t.image(techSource, 24, 14);
	t.pop();

	drawCenteredText('MODE: FIXED', 9, [140, 255, 180]);
	drawCenteredText(`CELL_COLOR: [${red}, 40, ${blue}]`, 11, [140, 220, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
