/**
 * @title plugins.TextmodePluginContext.registerLayerDisposedHook
 */
let disposedCount = 0;
let layerToDispose = null;

const hookPlugin = {
	name: 'layer-disposed-hook-plugin',
	install(textmodifier, context) {
		context.registerLayerDisposedHook(() => {
			disposedCount += 1;
		});
	},
};

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	plugins: [hookPlugin],
});

const labelLayer = t.layers.add();

t.setup(() => {
	layerToDispose = t.layers.add({ fontSize: 16 });
});

t.draw(() => {
	t.background(6, 8, 20);
});

t.mouseClicked(() => {
	if (!layerToDispose) return;
	layerToDispose.dispose();
	layerToDispose = null;
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('PLUGINS.REGISTERLAYERDISPOSEDHOOK', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LAYER DISPOSED HOOK', x, y++, 100, 220, 255);
	drawText('Runs when a layer is disposed.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`DISPOSED COUNT : ${disposedCount}`, x, y++, 140, 190, 255);
	drawText(
		layerToDispose ? 'Click to dispose layer.' : 'Layer has been disposed successfully.',
		x,
		y++,
		180,
		255,
		180
	);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
