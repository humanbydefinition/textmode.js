/**
 * @title TextmodeLayer.useTileColors
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const tilesLayer = t.layers.add();
const labelLayer = t.layers.add();

let useAuthored = false;

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
});

t.draw(() => {
	t.background(6, 10, 22);
	useAuthored = Math.floor(t.frameCount / 150) % 2 === 0;
	tilesLayer.useTileColors(useAuthored);
});

tilesLayer.draw(() => {
	t.clear();

	const font = tilesLayer.font;
	if (!font || font.characters.length === 0) return;

	const cols = 16;
	const rows = 8;
	const startX = -Math.floor(cols / 2);
	const startY = -3;

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const tileIndex = row * cols + col;
			if (tileIndex >= font.characters.length) break;

			t.push();
			t.translate(startX + col, startY + row);
			t.char(tileIndex);
			const hue = (tileIndex / font.characters.length) * 360;
			const r = Math.round(128 + 100 * Math.sin((hue * Math.PI) / 180));
			const g = Math.round(128 + 100 * Math.sin(((hue + 120) * Math.PI) / 180));
			const b = Math.round(128 + 100 * Math.sin(((hue + 240) * Math.PI) / 180));
			t.charColor(r, g, b);

			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	let y = -Math.floor(t.grid.rows / 2) + 3;
	const x = -Math.floor(t.grid.cols / 2) + 3;

	drawText('TEXTMODELAYER.USETILECOLORS', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: TILESET COLOR SOURCE', x, y++, [100, 220, 255]);

	if (useAuthored) {
		drawText('MODE: AUTHORED COLORS', x, y++, [255, 210, 100]);
		drawText('Tile PNG colors show directly.', x, y++, [140, 160, 190]);
	} else {
		drawText('MODE: RECOLORED', x, y++, [120, 255, 180]);
		drawText('charColor palette is applied.', x, y++, [140, 160, 190]);
	}

	drawText('------------------------------------', x, y++, [80, 100, 150]);
	const remaining = 150 - (t.frameCount % 150);
	drawText(`SWITCH IN: ${remaining} FRAMES`, x, y++, [160, 160, 160]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
