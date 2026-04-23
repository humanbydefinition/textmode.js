/**
 * @title TextmodeLayer.show
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const reveal = t.layers.add({ visible: false, blendMode: 'screen' });

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
	t.background(8, 12, 24);
	if (t.frameCount === 120) reveal.show();
	label(t.frameCount < 120 ? 'layer hidden for 120 frames' : 'show() revealed the layer', -6, [255, 220, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

reveal.draw(() => {
	t.clear();
	t.rotateZ(t.frameCount * 2);
	t.char('*');
	t.charColor(120, 220, 255);
	t.rect(18, 10);
});
