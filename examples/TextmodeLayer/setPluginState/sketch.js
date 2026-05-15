/**
 * @title TextmodeLayer.setPluginState
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const moduleLayer = t.layers.add();
const PLUGIN_NAME = 'core-data';

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

t.setup(() => {
	moduleLayer.setPluginState(PLUGIN_NAME, {
		power: 0,
		sync: true,
		id: 'CORE-A1',
	});
});

moduleLayer.draw(() => {
	t.clear();
	const state = moduleLayer.getPluginState(PLUGIN_NAME);

	if (state) {
		state.power = 0.5 + 0.5 * Math.sin(t.frameCount * 0.05);

		t.push();
		t.charColor(140, 220, 255);
		t.char('#');
		const size = 4 + Math.round(state.power * 4);
		t.rect(size * 2, size);
		t.pop();

		drawCenteredText('TextmodeLayer.setPluginState', -12, [240, 245, 255]);
		drawCenteredText('Attaching persistent data objects to a layer.', -10, [150, 170, 200]);

		drawCenteredText('SYSTEM CONFIGURATION', 8, [255, 225, 140]);
		drawCenteredText(`ID: ${state.id}  SYNC: ${state.sync}`, 10, [180, 200, 220]);
		drawCenteredText(`PWR_LOAD: ${Math.round(state.power * 100)}%`, 12, [140, 220, 255]);
	}
});

t.draw(() => {
	t.background(6, 10, 22);

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
