/**
 * @title TextmodeImage.creation
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let image = null;

function createImageUrl() {
	const canvas = document.createElement('canvas');
	canvas.width = 96;
	canvas.height = 64;
	const ctx = canvas.getContext('2d');
	const gradient = ctx.createLinearGradient(0, 0, 96, 64);
	gradient.addColorStop(0, '#0ea5e9');
	gradient.addColorStop(1, '#f59e0b');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 96, 64);
	ctx.fillStyle = '#020617';
	ctx.fillRect(12, 18, 72, 28);
	ctx.fillStyle = '#f8fafc';
	ctx.fillRect(22, 26, 52, 12);
	return canvas.toDataURL();
}

t.setup(async () => {
	image = await t.loadImage(createImageUrl());
	image.characters(' .:-=+*#%@');
	image.charColorMode('fixed');
	image.charColor(255, 235, 180);
	image.cellColorMode('sampled');
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 18);
	if (!image) return;
	t.push();
	t.rotateZ(Math.sin(t.frameCount * 0.02) * 4);
	t.image(image, Math.floor(t.grid.cols * 0.55), Math.floor(t.grid.rows * 0.55));
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODEIMAGE.CREATION', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LOADED IMAGE SOURCE', x, y++, 100, 220, 255);
	drawText('Image converts to cells.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SIZE: ${image ? image.width : 0}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
