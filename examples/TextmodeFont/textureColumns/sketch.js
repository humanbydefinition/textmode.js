/**
 * @title TextmodeFont.textureColumns
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

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
	const cols = t.font.textureColumns;
	t.background(8, 10, 22);
	label('textureColumns', -6, [255, 210, 90]);
	label(`atlas columns: ${cols}`, -2);

	for (let i = 0; i < cols; i++) {
		t.push();
		t.translate(-cols / 2 + i, 3);
		t.char('|');
		t.charColor(120 + (i % 12) * 10, 180, 255);
		t.line(0, -2, 0, 2);
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
