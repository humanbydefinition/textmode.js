/**
 * @title plugins.TextmodePluginContext.registerPreDrawHook
 */
let preDrawFrames = 0;
let fluidTime = 0;

const plasmaPlugin = {
	name: 'plasma-pre',
	install(textmodifier, context) {
		context.registerPreDrawHook(() => {
			preDrawFrames++;
			fluidTime += 0.06;
		});
	},
};

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	plugins: [plasmaPlugin],
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(10, 4, 20);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const left = -Math.floor((cols - 1) / 2);
	const right = left + cols - 1;
	const top = -Math.floor(rows / 2);
	const bottom = top + rows - 1;

	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			const v1 = Math.sin(x * 0.15 + fluidTime);
			const v2 = Math.sin(y * 0.15 + fluidTime * 1.3);
			const v3 = Math.sin((x + y) * 0.15 + fluidTime * 0.8);
			const norm = (v1 + v2 + v3 + 3) / 6;

			const charKey = norm > 0.75 ? '@' : norm > 0.5 ? '#' : norm > 0.3 ? '+' : '.';

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(180 + norm * 75), Math.floor(60 + norm * 140), Math.floor(220 - norm * 100));
			t.cellColor(Math.floor(16 + norm * 14), Math.floor(6 + norm * 10), Math.floor(24 + norm * 18));
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
	t.print('PLUGINS.REGISTERPREDRAWHOOK', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: GRAVITATIONAL PLASMA VORTEX', x, y++);
	t.charColor(140, 160, 190);
	t.print('Executes right before main t.draw()', x, y++);
	t.print('runs each animation frame.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`PRE-DRAW FRAMES: ${preDrawFrames}`, x, y++);
	t.print(`FLUID TIME: ${fluidTime.toFixed(2)} S`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
