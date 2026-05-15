/**
 * @title TextmodeSource.originalWidth
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let source;
const PIXEL_WIDTH = 512;

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

t.setup(() => {
	const canvas = document.createElement('canvas');
	canvas.width = PIXEL_WIDTH;
	canvas.height = 128;
	source = t.createTexture(canvas);
	source.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(6, 10, 22);

	if (!source) return;

	const ow = source.originalWidth;

	drawCenteredText('TextmodeSource.originalWidth', -8, [240, 245, 255]);
	drawCenteredText('The raw pixel width of the source asset.', -6, [150, 170, 200]);

	drawCenteredText(`${ow} PIXELS`, 6, [255, 225, 140]);
	drawCenteredText('This value is independent of the grid resolution.', 9, [100, 120, 150]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
