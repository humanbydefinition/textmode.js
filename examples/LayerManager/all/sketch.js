/**
 * @title LayerManager.all
 */
const t = textmode.create({
	pixelDensity: 1,
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

const demoLayers = labels.map((label, index) => {
	const layer = t.layers.add({ blendMode: 'screen', opacity: 0.7 });

	layer.draw(() => {
		t.clear();
		drawCenteredText(label, 0, colors[index]);
	});

	return layer;
});
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;

	t.layers.all
		.filter((layer) => layer !== labelLayer)
		.forEach((layer, index) => {
			const angle = time + index * ((Math.PI * 2) / demoLayers.length);
			const radius = 5;

			layer.offset(Math.cos(angle) * radius, Math.sin(angle) * radius);
			layer.opacity(0.4 + 0.4 * Math.sin(time * 2 + index));
		});
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('LAYERMANAGER.ALL', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: READ LAYER STACK', x, y++, [100, 220, 255]);
	drawText('Returns all user-created layers.', x, y++, [140, 160, 190]);
	drawText('HUD layer is filtered from motion.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`DEMO LAYERS: ${demoLayers.length}`, x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
