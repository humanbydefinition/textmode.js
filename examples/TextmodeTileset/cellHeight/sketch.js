/**
 * @title TextmodeTileset.cellHeight
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
	t.background(14, 4, 24);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;
	const chars = tileset.characters;
	const cH = tileset.cellHeight;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(y * (cH * 0.02) - tm * 2 + Math.sin(x * 0.25) * 2);
			const norm = (wave + 1) * 0.5;

			const isCrest = Math.abs(wave) > 0.82;
			const charIdx = Math.floor(Math.abs(y * 2 + Math.cos(x * 0.2 + tm * 2) * 6) % (chars.length || 1));
			const charKey = isCrest ? '=' : chars[charIdx] ? chars[charIdx].character : '-';

			t.push();
			t.translate(x, y);
			t.charColor(
				isCrest ? 255 : Math.floor(180 + norm * 75),
				isCrest ? 200 : Math.floor(40 + norm * 80),
				isCrest ? 60 : Math.floor(140 + norm * 80)
			);
			t.cellColor(
				isCrest ? 35 : Math.floor(8 + norm * 12),
				isCrest ? 10 : Math.floor(4 + norm * 10),
				isCrest ? 40 : Math.floor(16 + norm * 20)
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
	const height = tileset.cellHeight;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.CELLHEIGHT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: VERTICAL RASTER OSCILLOGRAM', x, y++);
	t.charColor(140, 160, 190);
	t.print('Effective render cell height in px.', x, y++);
	t.print('Controls vertical wave stride.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 200, 60);
	t.print(`CELL HEIGHT: ${height} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
