/**
 * @title TextmodeLayer.loadTileset
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const tilesLayer = t.layers.add();
const labelLayer = t.layers.add();

function drawText(text, x, y, color = [200, 220, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(color[0], color[1], color[2]);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

t.setup(async () => {
	await tilesLayer.loadTileset({
		source: 'https://littlebitspace.com/resources/fonts/T64.png',
		columns: 16,
		rows: 16,
		count: 256,
	});

	// Use authored colors from the tileset PNG
	tilesLayer.useTileColors(true);
});

t.draw(() => {
	t.background(6, 10, 22);
});

tilesLayer.draw(() => {
	t.clear();

	const font = tilesLayer.font;
	if (!font || font.characters.length === 0) return;

	const time = t.frameCount * 0.04;
	const activeTile = Math.floor(time) % font.characters.length;

	const cols = 16;
	const startX = -Math.floor(cols / 2);
	const startY = -4;

	// Draw all tiles in a grid
	for (let i = 0; i < font.characters.length; i++) {
		const col = i % cols;
		const row = Math.floor(i / cols);
		t.push();
		t.translate(startX + col, startY + row);
		t.char(i);

		// Highlight the currently cycled tile
		if (i === activeTile) {
			t.charColor(255, 255, 100);
		}

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
	const font = tilesLayer.font;
	const count = font ? font.characters.length : 0;

	drawText('TEXTMODELAYER.LOADTILESET', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: LOAD TILESET', x, y++, [100, 220, 255]);
	drawText('Loads bitmap glyphs into a layer.', x, y++, [140, 160, 190]);
	drawText('Tile colors are authored in PNG.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`TILES LOADED: ${count}`, x, y++, [120, 255, 180]);
	drawText('SOURCE: T64 PNG, 16 x 16', x, y++, [160, 160, 160]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
