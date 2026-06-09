/**
 * @title Textmodifier.createTexture
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const sourceCanvas = document.createElement('canvas');
sourceCanvas.width = 64;
sourceCanvas.height = 64;
const ctx = sourceCanvas.getContext('2d');
let texture;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.setup(() => {
	texture = t.createTexture(sourceCanvas);
});

t.draw(() => {
	t.background(6, 10, 22);
	ctx.fillStyle = '#10183a';
	ctx.fillRect(0, 0, 64, 64);
	ctx.fillStyle = '#facc15';
	ctx.fillRect(8 + (t.frameCount % 32), 20, 16, 16);
	if (texture) t.image(texture, 24, 14);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CREATETEXTURE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CANVAS TEXTURE', x, y++, 100, 220, 255);
	drawText('Wraps a 2D canvas source.', x, y++, 140, 160, 190);
	drawText('Source canvas is animated.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(texture ? 'TEXTURE: READY' : 'TEXTURE: WAIT', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
