/**
 * @title TextmodeSource.cellColor
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const labelLayer = t.layers.add();
let techSource = null;
let red = 40;
let blue = 80;

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
	red = Math.round(40 + 40 * Math.sin(time));
	blue = Math.round(80 + 40 * Math.cos(time * 0.7));

	techSource.cellColor(red, 40, blue);

	t.push();
	t.translate(0, 0);
	t.image(techSource, 24, 14);
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

	drawText('TEXTMODESOURCE.CELLCOLOR', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SET CONSTANT CELL COLOR', x, y++, 100, 220, 255);
	drawText('Sets color used in fixed coloring mode.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`CELL COLOR: RGB(${red},40,${blue})`, x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
