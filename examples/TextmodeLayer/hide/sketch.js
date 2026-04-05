/**
 * @title TextmodeLayer.hide
 * @author codex
 */
const t = textmode.create({ width: 640, height: 480, fontSize: 16 });
const banner = t.layers.add({ blendMode: 'screen' });
let hidden = false;

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

t.mousePressed(() => {
	banner.hide();
	hidden = true;
});

t.draw(() => {
	t.background(6, 10, 18);
	label(hidden ? 'hide() removed the top layer' : 'click to hide the banner layer', -6, [255, 220, 120]);
});

banner.draw(() => {
	t.clear();
	t.char('H');
	t.charColor(255, 120, 160);
	t.rect(20, 6);
});
