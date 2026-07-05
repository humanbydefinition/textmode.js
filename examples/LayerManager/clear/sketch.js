/**
 * @title LayerManager.clear
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let labelLayer = t.layers.add();
let mode = 0;

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

function drawHud() {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('LAYERMANAGER.CLEAR', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: CLEAR USER LAYERS', x, y++, [100, 220, 255]);
	drawText('Rebuilds a fresh layer stack.', x, y++, [140, 160, 190]);
	drawText('HUD is recreated after clear().', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`MODE: ${(mode % 9) + 1}`, x, y++, [140, 255, 180]);
}

function rebuildLayers() {
	t.layers.clear();
	mode++;

	const labels = ['Layer A', 'Layer B', 'Layer C'];
	const colors = [
		[255, 120, 80],
		[120, 255, 180],
		[80, 180, 255],
	];

	for (let index = 0; index < labels.length; index++) {
		const layer = t.layers.add({
			blendMode: ['screen', 'additive', 'difference'][index],
			opacity: 0.6,
		});

		layer.draw(() => {
			t.clear();
			drawCenteredText(labels[index], (index - 1) * 6, colors[index]);
		});
	}

	labelLayer = t.layers.add();
	labelLayer.draw(drawHud);
}

labelLayer.draw(drawHud);

t.setup(() => {
	rebuildLayers();
});

t.draw(() => {
	t.background(6, 10, 22);

	drawCenteredText('Base Layer', -12, [240, 245, 255]);

	if (t.frameCount % 180 === 0) {
		rebuildLayers();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
