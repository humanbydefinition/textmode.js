/**
 * @title TextmodeLayer.width
 * @author codex
 */
const t = textmode.create({ width: 640, height: 480, fontSize: 16 });
const detail = t.layers.add({ fontSize: 8 });

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
	t.background(8, 10, 18);
	label(`detail.width: ${detail.width}px`, -2, [255, 220, 120]);
});

detail.draw(() => {
	t.clear();
	t.char('.');
	t.charColor(120, 220, 255);
	t.rect(60, 18);
});
