/**
 * @title TextmodeTexture.source
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let texture = null;
let sourceCanvas = null;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.setup(() => {
	sourceCanvas = document.createElement('canvas');
	sourceCanvas.width = 120;
	sourceCanvas.height = 80;
	texture = t.createTexture(sourceCanvas);
	texture.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(8, 10, 18);
	if (!texture) return;
	const ctx = sourceCanvas.getContext('2d');
	ctx.fillStyle = '#0a0d1a';
	ctx.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);
	ctx.fillStyle = '#38bdf8';
	ctx.beginPath();
	ctx.arc(60 + Math.sin(t.frameCount * 0.05) * 30, 40, 18, 0, Math.PI * 2);
	ctx.fill();
	t.image(texture, Math.floor(t.grid.cols * 0.5), Math.floor(t.grid.rows * 0.5));
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODETEXTURE.SOURCE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: BACKING ELEMENT', x, y++, 100, 220, 255);
	drawText('Texture keeps its source.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const size = sourceCanvas ? sourceCanvas.width + 'x' + sourceCanvas.height : '0x0';
	drawText(`SIZE: ${size}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
