/**
 * @title TextmodeTileset.characterMap
 */
const T64_URL = 'https://littlebitspace.com/resources/fonts/T64.png';
const TILE_COLUMNS = 16;
const TILE_ROWS = 16;
const TILE_COUNT = TILE_COLUMNS * TILE_ROWS;

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let tileset = null;

function tilesetOptions() {
	return {
		source: T64_URL,
		columns: TILE_COLUMNS,
		rows: TILE_ROWS,
		count: TILE_COUNT,
		fontSize: 16,
	};
}

t.setup(async () => {
	tileset = await t.loadTileset(tilesetOptions());
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(5, 7, 18);
	if (!tileset) return;
	const startX = -Math.floor(TILE_COLUMNS / 2);
	const startY = -Math.floor(TILE_ROWS / 2);
	for (let i = 0; i < TILE_COUNT; i++) {
		t.push();
		t.translate(startX + (i % TILE_COLUMNS), startY + Math.floor(i / TILE_COLUMNS));
		t.char(i);
		t.charColor(120 + i * 6, 220, 255 - i * 7);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODETILESET.CHARACTERMAP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: GLYPH ATLAS DATA', x, y++, 100, 220, 255);
	drawText('T64 web tileset feeds glyphs.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MAP SIZE: ${tileset.characterMap.size}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
