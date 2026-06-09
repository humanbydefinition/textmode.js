/**
 * @title TextmodeLayer.texture
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const layer = t.layers.add({ fontSize: 16, blendMode: 'screen' });
const labelLayer = t.layers.add();

function drawText(text, x, y, rgb = [220, 230, 255]) {
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

t.draw(() => {
	t.background(5, 7, 18);
});

layer.draw(() => {
	t.clear();
	t.push();
	t.rotateZ(t.frameCount * 1.5);
	t.charColor(120, 205, 255);
	t.rect(18, 8);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const ready = layer.texture === layer.asciiFramebuffer.textures[0];

	drawText('TEXTMODELAYER.TEXTURE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: ASCII TEXTURE HANDLE', x, y++, [100, 220, 255]);
	drawText('Exposes the composited texture.', x, y++, [140, 160, 190]);
	drawText('Matches asciiFramebuffer tex 0.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(ready ? 'TEXTURE: READY' : 'TEXTURE: PENDING', x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
