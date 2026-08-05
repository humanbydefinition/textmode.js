/**
 * @title TextmodeFont.characters
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(8, 6, 16);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;
	const glyphs = t.font.characters;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const angle = Math.atan2(y, x) + tm;
			const radius = Math.hypot(x, y);
			const spiral = (angle * 3 + radius * 0.4) % (Math.PI * 2);
			const val = (Math.sin(spiral) + 1) * 0.5;

			const gIdx = Math.floor((radius * 2 + angle * 4 + tm * 5) % (glyphs.length || 1));
			const glyphObj = glyphs[gIdx] || glyphs[0];
			const char = glyphObj ? glyphObj.character : '.';
			const unicode = glyphObj ? glyphObj.unicode : 32;

			t.push();
			t.translate(x, y);
			t.charColor(
				Math.floor(80 + (unicode % 160)),
				Math.floor(140 + val * 100),
				Math.floor(240 - (unicode % 120))
			);
			t.cellColor(Math.floor(10 + val * 20), Math.floor(12 + val * 20), Math.floor(30 + val * 30));
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

	const glyphs = t.font.characters;
	const sampleIdx = Math.floor(t.frameCount * 0.05) % (glyphs.length || 1);
	const sampleGlyph = glyphs[sampleIdx] || { character: ' ', unicode: 32 };
	const hexCode = `U+${sampleGlyph.unicode.toString(16).toUpperCase().padStart(4, '0')}`;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEFONT.CHARACTERS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: UNICODE GLYPH ARRAY', x, y++);
	t.charColor(140, 160, 190);
	t.print('Array of all font TextmodeGlyph objects.', x, y++);
	t.print('Accesses character & unicode attributes.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TOTAL GLYPHS: ${glyphs.length}`, x, y++);
	t.print(`SAMPLE "${sampleGlyph.character}": ${hexCode}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
