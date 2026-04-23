/**
 * @title TextmodeLayer.loadTileset
 * @author codex
 */
const TILE_COLUMNS = 16;
const TILE_ROWS = 16;
const TILE_COUNT = TILE_COLUMNS * TILE_ROWS;

const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
const tilesLayer = t.layers.add({ fontSize: 16 });

let tileset = null;
let useTileColors = false;

function activeTileIndex() {
	return Math.floor((t.frameCount * 0.4) % TILE_COUNT);
}

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

	await tilesLayer.loadTileset(tileset);
	tilesLayer.useTileColors(useTileColors);
});

t.draw(() => {
	t.background(5, 7, 18);
	label('layer-local tileset', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	label('T64  16 x 16  8 x 8 cells', Math.floor(t.grid.rows * 0.22));
	label(useTileColors ? 'layer uses authored colors' : 'layer recolors through char/cell', Math.floor(t.grid.rows * 0.30));
	label('click to toggle layer.useTileColors()', Math.floor(t.grid.rows * 0.38), [120, 205, 255]);
});

tilesLayer.draw(() => {
	if (!tileset) {
		return;
	}

	t.clear();
	tilesLayer.useTileColors(useTileColors);
	t.char(activeTileIndex());
	t.charColor(255, 90, 110);
	t.cellColor(18, 70, 160);
	t.point();
});

t.mouseClicked(() => {
	useTileColors = !useTileColors;
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
