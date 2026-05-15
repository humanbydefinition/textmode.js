/**
 * @title TextmodeLayer.deletePluginState
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const layer = t.layers.add();
const PLUGIN_NAME = 'monitor';

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.mousePressed(() => {
	if (layer.hasPluginState(PLUGIN_NAME)) {
		layer.deletePluginState(PLUGIN_NAME);
	}
});

layer.draw(() => {
	t.clear();

	if (!layer.hasPluginState(PLUGIN_NAME)) {
		layer.setPluginState(PLUGIN_NAME, { angle: 0, resets: 0 });
	}

	const state = layer.getPluginState(PLUGIN_NAME);

	state.angle += 0.05;

	t.push();
	t.rotateZ((state.angle * 180) / Math.PI);
	t.charColor(120, 180, 255);
	t.char('#');
	t.rect(8, 4);
	t.pop();

	drawCenteredText('TextmodeLayer.deletePluginState', -10, [240, 245, 255]);
	drawCenteredText('Click to delete the "monitor" plugin state.', -8, [150, 170, 200]);

	const statusColor = layer.hasPluginState(PLUGIN_NAME) ? [120, 255, 150] : [255, 100, 100];
	drawCenteredText('STATE: ' + (layer.hasPluginState(PLUGIN_NAME) ? 'ACTIVE' : 'DELETED'), 6, statusColor);
	drawCenteredText('VALUE: ' + state.angle.toFixed(2), 8, [180, 200, 220]);
});

t.draw(() => {
	t.background(6, 10, 22);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
