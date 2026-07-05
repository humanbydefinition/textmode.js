/**
 * @title LayerManager.move
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labels = ['Layer 1', 'Layer 2', 'Layer 3'];
const colors = [
	[255, 120, 80],
	[120, 255, 180],
	[80, 180, 255],
];

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

const layers = labels.map((label, index) => {
	const layer = t.layers.add();

	layer.draw(() => {
		t.clear();
		drawCenteredText(label, 0, colors[index]);
	});

	return layer;
});
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 22);

	drawCenteredText('Base Layer', -8, [240, 245, 255]);

	if (t.frameCount % 75 === 0) {
		const step = Math.floor(t.frameCount / 75);
		const layer = layers[step % layers.length];
		t.layers.move(layer, layers.length - 1);
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const step = Math.floor(t.frameCount / 75) % layers.length;

	drawText('LAYERMANAGER.MOVE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: MOVE LAYER INDEX', x, y++, [100, 220, 255]);
	drawText('Cycles one layer to the top.', x, y++, [140, 160, 190]);
	drawText('Label layer stays above demo.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`NEXT MOVE: ${labels[step]}`, x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
