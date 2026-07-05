/**
 * @title TextmodeSource.charRotation
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const labelLayer = t.layers.add();
let pointerSource = null;

t.setup(async () => {
	pointerSource = await t.loadImage(IMAGE_URL);
	pointerSource.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(6, 10, 22);

	if (!pointerSource) return;

	const imgW = 20;
	const imgH = 12;

	t.push();
	t.translate(-12, 0);
	pointerSource.charRotation(0);
	t.image(pointerSource, imgW, imgH);
	t.pop();

	t.push();
	t.translate(12, 0);
	pointerSource.charRotation(90);
	t.image(pointerSource, imgW, imgH);
	t.pop();
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODESOURCE.CHARROTATION', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: GLYPH ROTATION ANGLE', x, y++, 100, 220, 255);
	drawText('Rotates mapped characters in degrees.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('ROTATION ANGLE: 0 & 90 deg', x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
