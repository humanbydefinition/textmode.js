/**
 * @title TextmodeLayer.loadTileset
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

// Each layer can have its own tileset and color behavior.
const tilesLayer = t.layers.add();

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

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
	await tilesLayer.loadTileset({
		source: 'https://littlebitspace.com/resources/fonts/T64.png',
		columns: 16,
		rows: 16,
		count: 256,
	});
});

t.draw(() => {
	t.background(6, 10, 22);

	drawCenteredText('TextmodeLayer.loadTileset', -12, [240, 245, 255]);
	drawCenteredText('Bitmaps repacked into per-layer glyph atlases.', -10, [150, 170, 200]);

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, 1);
	t.pop();

	drawCenteredText('CLICK TO TOGGLE useTileColors()', 10, [140, 220, 255]);
});

tilesLayer.draw(() => {
	t.clear();
	const font = tilesLayer.font;
	if (!font || font.characters.length === 0) return;

	const time = t.frameCount * 0.05;
	const activeTile = Math.floor(time) % font.characters.length;

	t.push();
	t.translate(0, 0);
	t.char(activeTile);

	t.charColor(120, 255, 180);
	t.cellColor(20, 40, 60);
	t.rect(10, 6);
	t.pop();

	const mode = tilesLayer.useTileColors();
	const statusColor = mode ? [255, 225, 140] : [140, 180, 255];
	drawCenteredText('MODE: ' + (mode ? 'AUTHORED COLORS' : 'RECOLORED'), 6, statusColor);
});

t.mouseClicked(() => {
	tilesLayer.useTileColors(!tilesLayer.useTileColors());
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
