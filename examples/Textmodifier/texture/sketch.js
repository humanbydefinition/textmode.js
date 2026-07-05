/**
 * @title Textmodifier.texture
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
	source.characters(' .:-=+*#%@').cellColorMode('fixed').cellColor(4, 8, 16);
});

t.draw(() => {
	t.background(4, 7, 18);
	if (!ctx || !source) return;

	const hue = (t.frameCount * 2) % 360;
	const gradient = ctx.createLinearGradient(0, 0, 96, 96);
	gradient.addColorStop(0, `hsl(${hue}, 95%, 58%)`);
	gradient.addColorStop(1, `hsl(${(hue + 130) % 360}, 90%, 45%)`);
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 96, 96);
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(18, 18, 60, 60);
	ctx.fillStyle = '#111827';
	ctx.fillRect(30, 30, 36, 36);

	spin = (t.frameCount * 1.2) % 360;
	t.perspective(58, 0.1, 4096);
	t.camera(0, -8, 34, 0, 0, 0);
	t.ambientLight(18, 20, 28);
	t.pointLight([255, 230, 180], { x: 20, y: -18, z: 26 });
	t.texture(source);
	t.rotateY(spin);
	t.rotateX(18);
	t.sphere(11);
	t.noTexture();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.TEXTURE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: TEXTURED GEOMETRY', x, y++, 100, 220, 255);
	drawText('Canvas source samples the sphere.', x, y++, 140, 160, 190);
	drawText('Brightness maps to glyphs.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SPIN: ${spin.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
