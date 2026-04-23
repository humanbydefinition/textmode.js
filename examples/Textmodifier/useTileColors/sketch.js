/**
 * @title Textmodifier.useTileColors
 * @author codex
 */
const TILE_COLUMNS = 16;
const TILE_ROWS = 16;
const TILE_COUNT = TILE_COLUMNS * TILE_ROWS;

const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let tileset = null;
let usesTileColors = false;

function activeTileIndex() {
	return Math.floor((t.frameCount * 0.35) % TILE_COUNT);
}

function drawLabel(text, y, color = [220, 220, 220]) {
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
	tileset = await t.loadTileset({
		source: 'https://littlebitspace.com/resources/fonts/T64.png',
		columns: TILE_COLUMNS,
		rows: TILE_ROWS,
		count: TILE_COUNT,
	});
});

t.draw(() => {
	t.background(4, 7, 18);

	if (!tileset) {
		drawLabel('loading tileset...', 0, [255, 225, 140]);
		return;
	}

	const tileIndex = activeTileIndex();
	t.useTileColors(usesTileColors);
	t.char(tileIndex);
	t.charColor(255, 90, 90);
	t.cellColor(20, 60, 160);
	t.point();

	drawLabel('base layer tileset colors', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	drawLabel('T64  16 x 16  8 x 8 cells', Math.floor(t.grid.rows * 0.20));
	drawLabel(usesTileColors ? 'authored colors enabled' : 'char + cell recolor active', Math.floor(t.grid.rows * 0.28));
	drawLabel('click to toggle useTileColors()', Math.floor(t.grid.rows * 0.36), [120, 205, 255]);
});

t.mouseClicked(() => {
	usesTileColors = !usesTileColors;
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
