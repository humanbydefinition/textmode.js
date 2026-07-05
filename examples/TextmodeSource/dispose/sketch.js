/**
 * @title TextmodeSource.dispose
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let source = null;
let disposed = false;

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
	ctx.fillRect(16, 16, 64, 32);
	ctx.fillStyle = '#f8fafc';
	ctx.fillRect(28, 26, 40, 12);
	return canvas.toDataURL();
}

function configureSource(value) {
	value.characters(' .:-=+*#%@');
	value.charColorMode('sampled');
	value.cellColorMode('fixed');
}

t.mouseClicked(() => {
	if (source && !disposed) {
		source.dispose();
		disposed = true;
	}
});

t.setup(async () => {
	source = await t.loadImage(createImageUrl());
	configureSource(source);
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(5, 8, 18);
	if (!source || disposed) return;
	t.image(source, Math.floor(t.grid.cols * 0.55), Math.floor(t.grid.rows * 0.55));
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODESOURCE.DISPOSE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SOURCE SETTINGS', x, y++, 100, 220, 255);
	drawText('Image source conversion API.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const state = disposed ? 'Disposed' : 'Active';
	drawText(`STATUS: ${state}`, x, y++, 140, 255, 180);
	drawText('CLICK TO DISPOSE', x, y++, 255, 225, 140);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
