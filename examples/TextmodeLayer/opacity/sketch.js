/**
 * @title TextmodeLayer.opacity
 * @author codex
 */
const t = textmode.create({ width: 640, height: 480, fontSize: 16 });
const haze = t.layers.add({ blendMode: 'additive' });

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
	const amount = 0.15 + ((Math.sin(t.frameCount * 0.04) + 1) * 0.5) * 0.85;
	haze.opacity(amount);
	t.background(8, 10, 18);
	label(`opacity(): ${amount.toFixed(2)}`, -6, [255, 220, 120]);
});

haze.draw(() => {
	t.clear();
	t.rotateZ(t.frameCount * 3);
	t.char('#');
	t.charColor(80, 180, 255);
	t.rect(18, 18);
});
