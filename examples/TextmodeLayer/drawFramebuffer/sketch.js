/**
 * @title TextmodeLayer.drawFramebuffer
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const sourceLayer = t.layers.add();
const labelLayer = t.layers.add();

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	drawText(text, -Math.floor(text.length / 2), y, rgb);
}

sourceLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.03;

	t.push();
	t.rotateZ((time * 180) / Math.PI);
	t.charColor(255, 180, 100);
	t.char('#');
	t.rect(14, 1);
	t.rect(1, 14);
	t.pop();
});

t.draw(() => {
	t.background(6, 10, 22);

	const fb = sourceLayer.drawFramebuffer;

	if (fb) {
		t.push();
		t.translate(0, 0);
		t.image(fb, 24, 14);
		t.pop();

		drawCenteredText('INTERNAL DATA BUFFER', 10, [140, 220, 255]);
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const fb = sourceLayer.drawFramebuffer;

	drawText('TEXTMODELAYER.DRAWFRAMEBUFFER', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: RAW DRAW BUFFER', x, y++, [100, 220, 255]);
	drawText('Captures pre-ASCII drawing.', x, y++, [140, 160, 190]);
	drawText('Image preview reads the buffer.', x, y++, [140, 160, 190]);
	if (!fb) return;

	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`SIZE: ${fb.width} x ${fb.height}`, x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
