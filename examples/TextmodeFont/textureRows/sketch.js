/**
 * @title TextmodeFont.textureRows
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
	const rows = t.font.textureRows;
	t.background(8, 10, 22);
	label('textureRows', -6, [255, 210, 90]);
	label(`atlas rows: ${rows}`, -2);

	for (let i = 0; i < rows; i++) {
		t.push();
		t.translate(0, i - rows / 2 + 4);
		t.char('-');
		t.charColor(120, 170 + (i % 10) * 8, 255);
		t.line(-6, 0, 6, 0);
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
