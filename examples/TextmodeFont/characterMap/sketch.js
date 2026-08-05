/**
 * @title TextmodeFont.characterMap
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 12, 10);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.08;
	const glyphs = t.font.characters;
	const charMap = t.font.characterMap;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const stream = (y + Math.floor(tm * 4 + Math.sin(x * 0.3) * 6)) % (hh * 2 || 1);
			const norm = Math.abs(stream) / (hh * 2 || 1);

			const charIdx = Math.floor((Math.abs(x) * 3 + norm * glyphs.length) % glyphs.length);
			const charKey = glyphs[charIdx] ? glyphs[charIdx].character : ' ';

			const entry = charMap.get(charKey);
			const unicode = entry ? entry.unicode : 32;

			t.push();
			t.translate(x, y);
			t.charColor(
				Math.floor(40 + (unicode % 180)),
				Math.floor(240 - norm * 120),
				Math.floor(100 + (unicode % 100))
			);
			t.cellColor(4, Math.floor(14 + norm * 24), 10);
			t.char(charKey);
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

	const charMap = t.font.characterMap;
	const mapSize = charMap.size;
	const sampleEntry = charMap.get('@');
	const hexCode = sampleEntry ? `U+${sampleEntry.unicode.toString(16).toUpperCase().padStart(4, '0')}` : 'N/A';

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEFONT.CHARACTERMAP', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: CHARACTER MAP LOOKUP', x, y++);
	t.charColor(140, 160, 190);
	t.print('Maps char strings to glyph metadata.', x, y++);
	t.print('O(1) lookup for atlas resolution.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`MAP SIZE: ${mapSize} GLYPHS`, x, y++);
	t.print(`GLYPH "@" UNICODE: ${hexCode}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
