/**
 * @title TextmodeLayer.hasPluginState
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const layer = t.layers.add();
const labelLayer = t.layers.add();
const PLUGIN_NAME = 'module';
let exists = false;

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);

	if (t.frameCount % 120 === 0) {
		if (layer.hasPluginState(PLUGIN_NAME)) {
			layer.deletePluginState(PLUGIN_NAME);
		} else {
			layer.setPluginState(PLUGIN_NAME, { active: true });
		}
	}

	exists = layer.hasPluginState(PLUGIN_NAME);
	const statusColor = exists ? [120, 255, 150] : [255, 100, 100];

	t.push();
	t.translate(0, 0);
	t.char(exists ? '#' : '.');
	t.charColor(exists ? statusColor : [60, 70, 100]);
	t.rect(10, 5);

	t.push();
	t.translate(0, 0);
	t.charColor(statusColor);
	t.char('o');
	t.point();
	t.pop();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const statusColor = exists ? [120, 255, 150] : [255, 100, 100];

	drawText('TEXTMODELAYER.HASPLUGINSTATE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: CHECK PLUGIN STATE', x, y++, [100, 220, 255]);
	drawText('The module state toggles on/off.', x, y++, [140, 160, 190]);
	drawText('hasPluginState returns a boolean.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(exists ? 'STATUS: CONNECTED' : 'STATUS: DISCONNECTED', x, y++, statusColor);
	drawText(`HAS '${PLUGIN_NAME}': ${exists}`, x, y++, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
