/**
 * @title TextmodeSource.conversions
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let source = null;

function createImageUrl() {
	const canvas = document.createElement('canvas');
	Object.assign(canvas, { width: 128, height: 80 });
	const ctx = canvas.getContext('2d');
	const gradient = ctx.createLinearGradient(0, 0, 128, 80);
	gradient.addColorStop(0, '#020617');
	gradient.addColorStop(0.45, '#0ea5e9');
	gradient.addColorStop(1, '#f8fafc');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 128, 80);
	ctx.fillStyle = '#f97316';
	ctx.fillRect(15, 16, 34, 44);
	ctx.fillStyle = '#fde68a';
	ctx.fillRect(78, 22, 34, 34);
	return canvas.toDataURL();
}

function configureSource(source) {
	source.characters(' .:-=+*#%@').charColorMode('sampled').cellColorMode('fixed').cellColor('#020617');
}

function brightnessPass(start, end, characters, charColor) {
	return {
		mode: 'brightness',
		brightnessStart: start,
		brightnessEnd: end,
		characters,
		charColorMode: 'fixed',
		charColor,
	};
}

t.setup(async () => {
	source = await t.loadImage(createImageUrl());
	configureSource(source);
	source.conversions([
		brightnessPass(0, 84, ' .:', '#38bdf8'),
		brightnessPass(85, 169, '-=+', '#facc15'),
		brightnessPass(170, 255, '*#@', '#f8fafc'),
	]);
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(4, 7, 16);
	if (!source) return;

	const width = Math.max(12, Math.floor(t.grid.cols * 0.42));
	const height = Math.max(8, Math.floor(t.grid.rows * 0.4));
	const y = Math.floor(t.grid.rows * 0.12);
	t.push();
	t.translate(0, y);
	t.image(source, width, height);
	t.pop();
	drawText('STACKED SOURCE', -7, y - Math.floor(height / 2) - 2, 255, 225, 140);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODESOURCE.CONVERSIONS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ORDERED SOURCE PASSES', x, y++, 100, 220, 255);
	drawText('Three brightness ranges stack.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('PASSES: 3', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
