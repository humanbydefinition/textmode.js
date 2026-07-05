/**
 * @title Textmodifier.noTexture
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const sourceCanvas = document.createElement('canvas');
sourceCanvas.width = 96;
sourceCanvas.height = 96;
const ctx = sourceCanvas.getContext('2d');
let source;
let spin = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.setup(() => {
	source = t.createTexture(sourceCanvas);
	source.characters(' .:-=+*#%@').cellColorMode('fixed').cellColor(5, 9, 18);
});

t.draw(() => {
	t.background(5, 9, 20);
	if (!ctx || !source) return;

	const hue = (t.frameCount * 2.5) % 360;
	const gradient = ctx.createRadialGradient(48, 48, 10, 48, 48, 48);
	gradient.addColorStop(0, '#f8fafc');
	gradient.addColorStop(0.45, `hsl(${hue}, 92%, 58%)`);
	gradient.addColorStop(1, `hsl(${(hue + 170) % 360}, 88%, 34%)`);
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 96, 96);
	ctx.fillStyle = '#111827';
	ctx.fillRect(28, 28, 40, 40);
	ctx.fillStyle = '#f8fafc';
	ctx.fillRect(38, 38, 20, 20);

	spin = (t.frameCount * 1.4) % 360;
	t.perspective(58, 0.1, 4096);
	t.camera(0, -8, 38, 0, 0, 0);
	t.ambientLight(20, 22, 30);
	t.pointLight([255, 235, 180], { x: 18, y: -18, z: 30 });
	t.push();
	t.translate(-10, 0, 0);
	t.rotateY(spin);
	t.rotateX(14);
	t.texture(source);
	t.sphere(8);
	t.pop();
	t.noTexture();
	t.push();
	t.translate(10, 0, 0);
	t.rotateY(spin);
	t.rotateX(14);
	t.char('@');
	t.charColor(245, 245, 210);
	t.cellColor(20, 28, 48);
	t.sphere(8);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.NOTEXTURE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CLEAR TEXTURE', x, y++, 100, 220, 255);
	drawText('Left sphere samples the source.', x, y++, 140, 160, 190);
	drawText('Right sphere ignores it after clear.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SPIN: ${spin.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
