/**
 * @title TextmodeLayer.hasPluginState
 * @author codex
 */
const t = textmode.create({ width: 640, height: 480, fontSize: 16 });
const layer = t.layers.add();

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

t.draw(() => {
	if (t.frameCount % 120 === 0) {
		if (layer.hasPluginState('demo')) layer.deletePluginState('demo');
		else layer.setPluginState('demo', { enabled: true });
	}
	t.background(8, 10, 18);
	label(`hasPluginState(): ${layer.hasPluginState('demo')}`, -2, [255, 220, 120]);
});
