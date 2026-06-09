/**
 * @title plugins.TextmodePluginContext.registerPreSetupHook
 */
let preSetupCounter = 0;

const hookPlugin = {
	name: 'pre-setup-hook-plugin',
	install(textmodifier, context) {
		context.registerPreSetupHook(() => {
			preSetupCounter += 1;
		});
	},
};

const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	plugins: [hookPlugin],
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 8, 20);
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('PLUGINS.REGISTERPRESETUPHOOK', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PRE-SETUP LIFECYCLE HOOK', x, y++, 100, 220, 255);
	drawText('Runs after install, before setup.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`INVOCATIONS : ${preSetupCounter}`, x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
