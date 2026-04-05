/**
 * @title TextmodeFont.creation
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });
const accentLayer = t.layers.add({ fontSize: 8, offset: [0, 6] });

let customFont;

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
	customFont = await t.loadFont('../../primitives/FROGBLOCK-V2.1.ttf', false);
	await accentLayer.loadFont(customFont);
});

t.draw(() => {
	t.background(8, 10, 22);
	label('TextmodeFont creation', -6, [255, 210, 90]);
	label(`glyphs: ${customFont ? customFont.characters.length : 'loading'}`, -2);
	label('base layer keeps its original font', 2, [150, 160, 190]);
});

accentLayer.draw(() => {
	t.clear();
	label('custom font on another layer', 0, [120, 220, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
