/**
 * @title plugins.TextmodePluginContext.removeLayerExtension
 * @author codex
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
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	plugins: [extensionPlugin],
});

const layer = t.layers.add({ fontSize: 16 });

function label(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);

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
	layer.pulse(0.6);
});

t.draw(() => {
	t.background(5, 7, 18);
	label('removeLayerExtension()', -6, [255, 225, 140]);
	label(extensionRemoved ? 'pulse() removed from layers' : 'pulse() available on every layer', -2);
	label('click to remove extension', 2, [120, 205, 255]);
});

layer.draw(() => {
	t.clear();
	const state = layer.getPluginState('pulse');
	const amount = state?.amount ?? 0;

	t.push();
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

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
