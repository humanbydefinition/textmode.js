/**
 * @title TextmodeTileset.characters
 */
const T64_URL = 'https://littlebitspace.com/resources/fonts/T64.png';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let tileset = null;

t.setup(async () => {
	tileset = await t.loadTileset({ source: T64_URL, columns: 16, rows: 16, count: 256, fontSize: 16 });
});

t.draw(() => {
	t.background(10, 10, 18);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const chars = tileset.characters;
	const cursorIdx = Math.floor(t.frameCount * 0.1) % (chars.length || 1);

	const gridCols = 16;
	const gridRows = 16;
	const startX = -Math.floor(gridCols / 2);
	const startY = -Math.floor(gridRows / 2);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const col = x - startX;
			const row = y - startY;

			let charKey = ' ';
			let isActive = false;

			if (col >= 0 && col < gridCols && row >= 0 && row < gridRows) {
				const tileIndex = row * gridCols + col;
				const glyphObj = chars[tileIndex];
				charKey = glyphObj ? glyphObj.character : ' ';
				isActive = tileIndex === cursorIdx;
			}

			t.push();
			t.translate(x, y);
			t.charColor(isActive ? 255 : 120, isActive ? 220 : 180, isActive ? 100 : 240);
			t.cellColor(isActive ? 40 : 12, isActive ? 30 : 12, isActive ? 10 : 24);
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

	if (!tileset) return;
	const chars = tileset.characters;
	const cursorIdx = Math.floor(t.frameCount * 0.1) % (chars.length || 1);
	const sampleObj = chars[cursorIdx] || { character: ' ', unicode: 32 };
	const hexCode = `U+${sampleObj.unicode.toString(16).toUpperCase().padStart(4, '0')}`;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.CHARACTERS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: FULL TILESET GLYPH CATALOG', x, y++);
	t.charColor(140, 160, 190);
	t.print('Array of all tileset TextmodeGlyph items.', x, y++);
	t.print('Traverses full 256-tile catalog.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TOTAL TILES: ${chars.length}`, x, y++);
	t.print(`ACTIVE TILE: ${hexCode}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
