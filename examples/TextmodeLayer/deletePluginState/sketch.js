/**
 * @title TextmodeLayer.deletePluginState
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const layer = t.layers.add();
const labelLayer = t.layers.add();
const PLUGIN_NAME = 'monitor';
let stateDeleted = false;
let latestAngle = 0;

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

t.mousePressed(() => {
	if (layer.hasPluginState(PLUGIN_NAME)) {
		layer.deletePluginState(PLUGIN_NAME);
		stateDeleted = true;
	}
});

layer.draw(() => {
	t.clear();

	if (!layer.hasPluginState(PLUGIN_NAME)) {
		layer.setPluginState(PLUGIN_NAME, { angle: 0, resets: 0 });
	}

	const state = layer.getPluginState(PLUGIN_NAME);

	state.angle += 0.05;
	latestAngle = state.angle;

	t.push();
	t.rotateZ((state.angle * 180) / Math.PI);
	t.charColor(120, 180, 255);
	t.char('#');
	t.rect(8, 4);
	t.pop();
});

t.draw(() => {
	t.background(6, 10, 22);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const statusColor = stateDeleted ? [255, 180, 100] : [120, 255, 150];

	drawText('TEXTMODELAYER.DELETEPLUGINSTATE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: DELETE PLUGIN STATE', x, y++, [100, 220, 255]);
	drawText('Click clears the monitor state.', x, y++, [140, 160, 190]);
	drawText('Draw recreates it next frame.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(stateDeleted ? 'STATE: RECREATED' : 'STATE: ACTIVE', x, y++, statusColor);
	drawText(`ANGLE: ${latestAngle.toFixed(2)}`, x, y++, [180, 200, 220]);
	stateDeleted = false;
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
