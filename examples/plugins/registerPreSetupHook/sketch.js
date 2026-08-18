/**
 * @title plugins.TextmodePluginContext.on (preSetup)
 */
let preSetupTriggered = false;
let matrixSeed = 0;

const matrixPlugin = {
	name: 'matrix-presetup',
	install(textmodifier, context) {
		context.on('preSetup', () => {
			preSetupTriggered = true;
			matrixSeed = 1337;
		});
	},
};

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	plugins: [matrixPlugin],
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(4, 16, 8);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const left = -Math.floor((cols - 1) / 2);
	const right = left + cols - 1;
	const top = -Math.floor(rows / 2);
	const bottom = top + rows - 1;
	const tm = t.frameCount * 0.05;

	for (let x = left; x <= right; x++) {
		const dropY = Math.floor((x * 17.3 + tm * 15 + matrixSeed * 0.1) % rows) + top;
		for (let y = top; y <= bottom; y++) {
			const dist = Math.abs(y - dropY);
			const norm = Math.max(0, 1 - dist / 12);
			const charKey = dist === 0 ? '@' : norm > 0.6 ? '#' : norm > 0.3 ? '|' : '.';

			t.push();
			t.translate(x, y);
			t.charColor(
				dist === 0 ? 255 : Math.floor(40 + norm * 140),
				dist === 0 ? 255 : Math.floor(180 + norm * 75),
				dist === 0 ? 200 : Math.floor(60 + norm * 80)
			);
			t.cellColor(Math.floor(4 + norm * 8), Math.floor(12 + norm * 20), Math.floor(6 + norm * 10));
			t.char(charKey);
			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('PLUGINS.REGISTERPRESETUPHOOK', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: PRE-SETUP MATRIX PALETTE', x, y++);
	t.charColor(140, 160, 190);
	t.print('Runs immediately before t.setup()', x, y++);
	t.print('executes to seed initial state.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`PRE-SETUP RAN: ${preSetupTriggered}`, x, y++);
	t.print(`MATRIX SEED: ${matrixSeed}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
