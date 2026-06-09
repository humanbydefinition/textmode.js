/**
 * @title TextmodeLayer.asciiFramebuffer
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const layer = t.layers.add({ blendMode: 'screen' });
const labelLayer = t.layers.add();

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

layer.draw(() => {
	t.clear();
	t.push();
	t.rotateZ(t.frameCount * 2);
	t.char('*');
	t.charColor(120, 220, 255);
	t.rect(14, 8);
	t.pop();
});

t.draw(() => {
	t.background(8, 10, 18);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const fb = layer.asciiFramebuffer;

	drawText('TEXTMODELAYER.ASCIIFRAMEBUFFER', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: READ ASCII OUTPUT', x, y++, [100, 220, 255]);
	drawText('Samples the converted texture.', x, y++, [140, 160, 190]);
	drawText('Center pixel updates each frame.', x, y++, [140, 160, 190]);
	if (!fb) return;

	const pixels = fb.readPixels(0);
	const index = (Math.floor(fb.height / 2) * fb.width + Math.floor(fb.width / 2)) * 4;
	const rgb = `${pixels[index]}, ${pixels[index + 1]}, ${pixels[index + 2]}`;
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`RGB: ${rgb}`, x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
