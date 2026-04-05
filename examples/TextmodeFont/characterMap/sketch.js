/**
 * @title TextmodeFont.characterMap
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
	const glyph = t.font.characterMap.get('A');
	const color = glyph ? glyph.color.map((value) => Math.round(value * 255)) : [220, 220, 220];

	t.background(8, 10, 22);
	t.char('A');
	t.charColor(color[0], color[1], color[2]);
	t.rect(10, 10);
	label('characterMap', -6, [255, 210, 90]);
	label(`map.has('A'): ${t.font.characterMap.has('A')}`, -2);
	label('fast lookup for glyph metadata', 5, [150, 160, 190]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
