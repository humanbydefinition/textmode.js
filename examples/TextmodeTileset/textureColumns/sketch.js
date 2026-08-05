/**
 * @title TextmodeTileset.textureColumns
 */
const T64_URL = 'https://littlebitspace.com/resources/fonts/T64.png';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let tileset = null;

t.setup(async () => {
	tileset = await t.loadTileset({ source: T64_URL, columns: 16, rows: 16, count: 256, fontSize: 16 });
});

t.draw(() => {
	t.background(4, 18, 24);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;
	const chars = tileset.characters;
	const texCols = tileset.textureColumns;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const colIdx = Math.abs(x) % (texCols || 1);
			const ripple = Math.sin(y * 0.2 + colIdx * 0.4 - tm * 2.5);
			const norm = (ripple + 1) * 0.5;

			const isCrest = Math.abs(ripple) > 0.85;
			const charIdx = Math.floor(Math.abs(colIdx * 16 + y + tm * 8) % (chars.length || 1));
			const charKey = isCrest ? '*' : chars[charIdx] ? chars[charIdx].character : ':';

			t.push();
			t.translate(x, y);
			t.charColor(
				isCrest ? 255 : Math.floor(40 + norm * 180),
				isCrest ? 255 : Math.floor(200 - norm * 80),
				isCrest ? 180 : Math.floor(60 + (colIdx / texCols) * 120)
			);
			t.cellColor(
				isCrest ? 20 : Math.floor(4 + norm * 10),
				isCrest ? 45 : Math.floor(16 + norm * 20),
				isCrest ? 40 : Math.floor(20 + norm * 20)
			);
			t.char(charKey);
			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	if (!tileset) return;
	const texCols = tileset.textureColumns;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.TEXTURECOLUMNS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ATLAS COLUMN STRIDE WAVE', x, y++);
	t.charColor(140, 160, 190);
	t.print('Horizontal texture column count.', x, y++);
	t.print('Defines GPU atlas texture stride.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(0, 255, 180);
	t.print(`TEXTURE COLUMNS: ${texCols}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
