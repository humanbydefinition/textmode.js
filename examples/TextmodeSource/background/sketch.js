/**
 * @title TextmodeSource.background
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let sourceA, sourceB;

function createTransparentCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 128;
	canvas.height = 128;
	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	ctx.clearRect(0, 0, 128, 128);
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#ffffff';
	ctx.strokeRect(20, 20, 88, 88);

	ctx.fillStyle = '#ffffff';
	ctx.beginPath();
	ctx.arc(64, 64, 30, 0, Math.PI * 2);
	ctx.fill();

	return canvas;
}

t.setup(() => {
	const canvas = createTransparentCanvas();

	sourceA = t.createTexture(canvas);
	sourceA.characters(' .:-=+*#%@');

	sourceB = t.createTexture(canvas);
	sourceB.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(6, 10, 22);
	if (!sourceA || !sourceB) return;

	const time = t.frameCount * 0.05;
	const pulse = 0.5 + 0.5 * Math.sin(time);
	sourceB.background(pulse * 255, 100, 255 - pulse * 155);

	const imgW = 20;
	const imgH = 12;

	t.push();
	t.translate(-12, 0);
	t.image(sourceA, imgW, imgH);
	t.pop();

	t.push();
	t.translate(12, 0);
	t.image(sourceB, imgW, imgH);
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

	drawText('TEXTMODESOURCE.BACKGROUND', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: TRANSPARENT PIXEL FILL', x, y++, 100, 220, 255);
	drawText('Fills transparent pixels before mapping.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('Left  : DEFAULT BLACK FALLBACK', x, y++, 140, 180, 255);
	drawText('Right : CUSTOM BG PULSE FILL', x, y++, 255, 180, 100);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
