/**
 * @title TextmodeLayer.loadFont
 * @author codex
 */
const t = textmode.create({ width: 640, height: 480, fontSize: 16 });
const accent = t.layers.add({ blendMode: 'screen' });

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

t.setup(async () => {
	await accent.loadFont('../../primitives/FROGBLOCK-V2.1.ttf');
});

t.draw(() => {
	t.background(8, 10, 18);
	label('base layer keeps the default font', -4, [255, 220, 120]);
});

accent.draw(() => {
	t.clear();
	label('layer.loadFont() swapped only this layer', 4, [120, 220, 255]);
});
