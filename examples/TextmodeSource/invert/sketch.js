/**
 * @title TextmodeSource.invert
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const labelLayer = t.layers.add();
let gradientSource = null;

t.setup(async () => {
	gradientSource = await t.loadImage(IMAGE_URL);
	gradientSource.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(6, 10, 22);

	if (!gradientSource) return;

	const imgW = 20;
	const imgH = 12;

	t.push();
	t.translate(-12, 0);
	gradientSource.invert(false);
	t.image(gradientSource, imgW, imgH);
	t.pop();

	t.push();
	t.translate(12, 0);
	gradientSource.invert(true);
	t.image(gradientSource, imgW, imgH);
	t.pop();
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.translate(x, y);
	t.charColor(r, g, b);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODESOURCE.INVERT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: INVERT SOURCE BRIGHTNESS', x, y++, 100, 220, 255);
	drawText('Inverts pixel colors before mapping.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('INVERTED STATUS: false & true', x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
