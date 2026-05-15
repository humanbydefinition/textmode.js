/**
 * @title TextmodeLayer.hasPluginState
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const layer = t.layers.add();
const PLUGIN_NAME = 'module';

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

t.draw(() => {
	t.background(6, 10, 22);

	if (t.frameCount % 120 === 0) {
		if (layer.hasPluginState(PLUGIN_NAME)) {
			layer.deletePluginState(PLUGIN_NAME);
		} else {
			layer.setPluginState(PLUGIN_NAME, { active: true });
		}
	}

	const exists = layer.hasPluginState(PLUGIN_NAME);
	const statusColor = exists ? [120, 255, 150] : [255, 100, 100];

	drawCenteredText('TextmodeLayer.hasPluginState', -10, [240, 245, 255]);
	drawCenteredText('Checking for the presence of specific plugin data.', -8, [150, 170, 200]);

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

	drawCenteredText(exists ? 'STATUS: CONNECTED' : 'STATUS: DISCONNECTED', 6, statusColor);
	drawCenteredText(`hasPluginState('${PLUGIN_NAME}'): ${exists}`, 9, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
