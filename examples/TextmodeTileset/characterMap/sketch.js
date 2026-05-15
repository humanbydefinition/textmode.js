/**
 * @title TextmodeTileset.characterMap
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

	const charIndex = Math.floor(t.frameCount * 0.1) % tileset.characters.length;
	const glyph = tileset.characters[charIndex];
	const currentChar = glyph.character;
	const mapGlyph = tileset.characterMap.get(currentChar);

	label('TextmodeTileset.characterMap', -8, [255, 225, 140]);

	if (mapGlyph) {
		t.push();
		t.translate(0, 0);
		t.char(currentChar);
		t.charColor(255, 255, 255);
		t.point();
		t.pop();

		label('char: ' + currentChar, 6, [180, 200, 220]);
		label('map.size: ' + tileset.characterMap.size, 10, [150, 170, 200]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
