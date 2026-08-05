/**
 * @title TextmodeFont.fontSize
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 12, 18);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.02;
	const glyphs = t.font.characters;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const scaleRing = Math.floor(dist * 0.35 - tm * 2) % 5;
			const norm = Math.abs(scaleRing) / 5;

			const gIdx = Math.floor(Math.abs(dist * 0.7 - tm * 10 + Math.sin(x * 0.3) * 4) % (glyphs.length || 1));
			const glyphObj = glyphs[gIdx] || glyphs[0];
			const char = glyphObj ? glyphObj.character : '.';

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(240 - norm * 150), Math.floor(160 + norm * 85), Math.floor(60 + norm * 180));
			t.cellColor(Math.floor(10 + norm * 20), Math.floor(18 + norm * 15), Math.floor(30 + norm * 25));
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

	const sz = t.font.fontSize;
	const dims = t.font.maxGlyphDimensions;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEFONT.FONTSIZE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: FONT SIZE METRIC ACCESSOR', x, y++);
	t.charColor(140, 160, 190);
	t.print('Configures font atlas raster size.', x, y++);
	t.print('Determines pixel glyph resolution.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`FONT SIZE: ${sz} PX`, x, y++);
	t.print(`CELL DIMS: ${dims.width} x ${dims.height} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
