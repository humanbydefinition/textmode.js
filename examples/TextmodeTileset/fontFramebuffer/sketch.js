/**
 * @title TextmodeTileset.fontFramebuffer
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

	const atlas = tileset.fontFramebuffer;

	label('TextmodeTileset.fontFramebuffer', -6, [255, 225, 140]);
	label('backing atlas framebuffer', -2, [180, 200, 220]);
	label(atlas.width + ' x ' + atlas.height + ' px', 4, [150, 170, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
