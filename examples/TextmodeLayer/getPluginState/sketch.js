/**
 * @title TextmodeLayer.getPluginState
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const trackerLayer = t.layers.add();
const labelLayer = t.layers.add();
const PLUGIN_NAME = 'tracker';
let latestX = 0;

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
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
		latestX = xPos;

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

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const state = trackerLayer.getPluginState(PLUGIN_NAME);
	const xText = latestX.toString().padStart(3, ' ');

	drawText('TEXTMODELAYER.GETPLUGINSTATE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: READ PLUGIN STATE', x, y++, [100, 220, 255]);
	drawText('Persistent data drives motion.', x, y++, [140, 160, 190]);
	drawText('The layer owns the stored object.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`X: ${xText}`, x, y++, [180, 200, 220]);
	drawText(`SPEED: ${state.speed.toFixed(2)}`, x, y++, [180, 200, 220]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
