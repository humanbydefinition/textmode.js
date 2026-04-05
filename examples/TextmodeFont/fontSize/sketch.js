/**
 * @title TextmodeFont.fontSize
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });
const miniLayer = t.layers.add({ fontSize: 16, offset: [0, 6] });

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
	t.background(8, 10, 22);
	label('fontSize', -6, [255, 210, 90]);
	label(`base font size: ${t.layers.base.font.fontSize}`, -2);
	label(`upper layer font size: ${miniLayer.font.fontSize}`, 2, [150, 160, 190]);
});

miniLayer.draw(() => {
	t.clear();
	label('larger layer font', 0, [120, 220, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
