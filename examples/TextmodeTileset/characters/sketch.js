/**
 * @title TextmodeTileset.characters
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

	const chars = tileset.characters;
	const cols = 16;
	const startX = -Math.floor(cols / 2);
	const startY = -Math.floor(chars.length / cols / 2);

	for (let i = 0; i < chars.length; i++) {
		const glyph = chars[i];
		t.push();
		t.translate(startX + (i % cols), startY + Math.floor(i / cols));

		// Use the character index safely.
		t.char(glyph.character);

		t.charColor(255, 255, 255);
		t.point();
		t.pop();
	}

	label('TextmodeTileset.characters', Math.floor(t.grid.rows / 2) - 3, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
