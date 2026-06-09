/**
 * @title TextmodeSource.conversionMode
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const labelLayer = t.layers.add();
let source = null;

t.setup(async () => {
	source = await t.loadImage(IMAGE_URL);
	source.conversionMode('brightness');
	source.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(4, 7, 18);
	t.background(0);
	if (!source) return;

	t.image(source, source.width, source.height);
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

	drawText('TEXTMODESOURCE.CONVERSIONMODE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SET IMAGE CONVERSION MODE', x, y++, 100, 220, 255);
	drawText('Sets mode used for pixel mapping.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONVERSION MODE: brightness', x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
