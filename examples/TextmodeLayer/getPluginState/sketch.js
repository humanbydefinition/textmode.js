/**
 * @title TextmodeLayer.getPluginState
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const trackerLayer = t.layers.add();
const PLUGIN_NAME = 'tracker';

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

trackerLayer.setPluginState(PLUGIN_NAME, {
	x: 0,
	speed: 0.1,
	amplitude: 15,
});

trackerLayer.draw(() => {
	t.clear();

	const state = trackerLayer.getPluginState(PLUGIN_NAME);

	if (state) {
		state.x += state.speed;
		const xPos = Math.round(Math.cos(state.x) * state.amplitude);

		t.push();
		t.translate(xPos, 0);
		t.charColor(120, 200, 255);
		t.char('#');
		t.point();

		t.push();
		t.translate(0, 3);
		t.char('^');
		t.charColor(60, 70, 100);
		t.point();
		t.pop();
		t.pop();

		drawCenteredText('TextmodeLayer.getPluginState', -10, [240, 245, 255]);
		drawCenteredText('Retrieving persistent state data from the layer.', -8, [150, 170, 200]);

		drawCenteredText('STATE MONITOR', 6, [140, 255, 180]);
		drawCenteredText(`X: ${xPos.toString().padStart(3, ' ')}`, 8, [180, 200, 220]);
		drawCenteredText(`SPEED: ${state.speed.toFixed(2)}`, 10, [180, 200, 220]);
	}
});

t.draw(() => {
	t.background(6, 10, 22);

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, 1);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
