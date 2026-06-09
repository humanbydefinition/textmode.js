/**
 * @title plugins.TextmodePluginContext.removeLayerExtension
 */
let removePulse = null;
let extensionRemoved = false;

const extensionPlugin = {
	name: 'extension-plugin',
	install(_textmodifier, context) {
		context.extendLayer('pulse', function (amount = 1) {
			this.setPluginState('pulse', { amount });
		});

		removePulse = () => {
			context.removeLayerExtension('pulse');
			extensionRemoved = true;
		};
	},
};

const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	plugins: [extensionPlugin],
});

const layer = t.layers.add({ fontSize: 16 });
const labelLayer = t.layers.add();

t.setup(() => {
	layer.pulse(0.6);
});

t.draw(() => {
	t.background(5, 7, 18);
});

layer.draw(() => {
	t.clear();
	const state = layer.getPluginState('pulse');
	const amount = state?.amount ?? 0;

	t.push();
	t.char('#');
	t.rotateZ(t.frameCount * (1 + amount));
	t.charColor(255, 180, 120);
	t.rect(14, 8);
	t.pop();
});

t.mouseClicked(() => {
	if (!removePulse || extensionRemoved) {
		return;
	}
	removePulse();
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

	drawText('PLUGINS.REMOVELAYEREXTENSION', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: REMOVE LAYER EXTENSIONS', x, y++, 100, 220, 255);
	const statusMsg = extensionRemoved ? 'pulse() was removed.' : 'pulse() is available on layer.';
	drawText(statusMsg, x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const clickMsg = extensionRemoved ? 'pulse() removed successfully.' : 'Click to remove pulse() extension.';
	drawText(clickMsg, x, y++, 120, 205, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
