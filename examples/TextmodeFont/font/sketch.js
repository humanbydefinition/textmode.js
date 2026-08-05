/**
 * @title TextmodeFont.font
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(8, 10, 18);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;
	const glyphs = t.font.characters;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const chebyshev = Math.max(Math.abs(x), Math.abs(y));
			const wave = Math.sin(chebyshev * 0.4 - tm * 2);
			const norm = (wave + 1) * 0.5;

			const angle = Math.atan2(y, x);
			const gIdx = Math.floor(Math.abs(chebyshev * 0.8 - tm * 8 + angle * 3) % (glyphs.length || 1));
			const glyphObj = glyphs[gIdx] || glyphs[0];
			const char = glyphObj ? glyphObj.character : '.';
			const unicode = glyphObj ? glyphObj.unicode : 32;

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(60 + (unicode % 160)), Math.floor(120 + norm * 120), Math.floor(240 - norm * 100));
			t.cellColor(Math.floor(8 + norm * 15), Math.floor(14 + norm * 20), Math.floor(28 + norm * 25));
			t.char(char);
			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const fontObj = t.font;
	const totalGlyphs = fontObj.characters ? fontObj.characters.length : 0;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEFONT.FONT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ACTIVE FONT ACCESSOR', x, y++);
	t.charColor(140, 160, 190);
	t.print('Gets or sets active TextmodeFont.', x, y++);
	t.print('Provides font atlas & glyph data.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TOTAL GLYPHS: ${totalGlyphs}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
