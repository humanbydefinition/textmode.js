/**
 * @title TextmodeFont.font
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
	const font = t.font.font;
	const unitsPerEm = font?.head?.unitsPerEm ?? 0;
	const ascender = font?.hhea?.ascender ?? 0;

	t.background(7, 10, 20);
	label('TextmodeFont.font', -5, [255, 220, 120]);
	label(`unitsPerEm ${unitsPerEm}`, -1);
	label(`ascender ${ascender}`, 3, [120, 205, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
