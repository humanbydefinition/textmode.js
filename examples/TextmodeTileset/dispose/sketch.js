/**
 * @title TextmodeTileset.dispose
 * @author codex
 */
const TILE_COLUMNS = 16;
const TILE_ROWS = 16;
const TILE_COUNT = TILE_COLUMNS * TILE_ROWS;

const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

let tileset = null;
let disposed = false;

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
		},
		false
	);
});

t.draw(() => {
	t.background(5, 7, 18);

	label('click to dispose tileset', -4, [255, 225, 140]);
	label(disposed ? 'tileset disposed' : 'tileset active', 0);
	label('T64  16 x 16  8 x 8 cells', 4);
	label('this frees atlas resources early', 8, [120, 205, 255]);
});

t.mouseClicked(() => {
	if (!tileset || disposed) {
		return;
	}

	tileset.dispose();
	disposed = true;
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
