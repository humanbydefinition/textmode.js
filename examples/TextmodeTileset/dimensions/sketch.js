/**
 * @title TextmodeTileset.nativeCellDimensions
 * @author codex
 */
const TILE_COLUMNS = 16;
const TILE_ROWS = 16;
const TILE_COUNT = TILE_COLUMNS * TILE_ROWS;

const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

let tileset = null;

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
	tileset = await t.loadTileset(
		{
			source: 'https://littlebitspace.com/resources/fonts/T64.png',
			columns: TILE_COLUMNS,
			rows: TILE_ROWS,
			count: TILE_COUNT,
			fontSize: 16,
		},
		false
	);
});

t.draw(() => {
	t.background(5, 7, 18);

	if (!tileset) {
		label('loading tileset...', 0, [255, 225, 140]);
		return;
	}

	const nativeDimensions = tileset.nativeCellDimensions;
	const maxGlyphDimensions = tileset.maxGlyphDimensions;
	const cellDimensions = tileset.cellDimensions;

	label('TextmodeTileset dimensions', -7, [255, 225, 140]);
	label('T64 tileset source', -3);
	label(`native ${nativeDimensions.width} x ${nativeDimensions.height}`, 1);
	label(`max ${maxGlyphDimensions.width} x ${maxGlyphDimensions.height}`, 5);
	label(`cell ${cellDimensions.width} x ${cellDimensions.height}`, 9);
	label(`cellWidth ${tileset.cellWidth}  cellHeight ${tileset.cellHeight}`, 13);
	label(`fontSize ${tileset.fontSize}`, 17, [120, 205, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
