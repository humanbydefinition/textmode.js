/**
 * @title TextmodeLayer.setPluginState
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const moduleLayer = t.layers.add();
const labelLayer = t.layers.add();
const PLUGIN_NAME = 'core-data';
let currentPower = 0;

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
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
		currentPower = state.power;

		t.push();
		t.charColor(140, 220, 255);
		t.char('#');
		const size = 4 + Math.round(state.power * 4);
		t.rect(size * 2, size);
		t.pop();
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

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const state = moduleLayer.getPluginState(PLUGIN_NAME);
	const load = Math.round(currentPower * 100);

	drawText('TEXTMODELAYER.SETPLUGINSTATE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: STORE PLUGIN STATE', x, y++, [100, 220, 255]);
	drawText('Attaches data to a layer.', x, y++, [140, 160, 190]);
	drawText('The object persists each frame.', x, y++, [140, 160, 190]);
	if (!state) return;

	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`ID: ${state.id}`, x, y++, [180, 200, 220]);
	drawText(`PWR LOAD: ${load}%`, x, y++, [140, 220, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
