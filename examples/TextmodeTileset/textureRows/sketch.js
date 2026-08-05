/**
 * @title TextmodeTileset.textureRows
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
	t.background(20, 8, 16);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;
	const chars = tileset.characters;
	const texRows = tileset.textureRows;

	for (let y = -hh; y <= hh; y++) {
		const rowIdx = Math.abs(y) % (texRows || 1);

		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(rowIdx * 0.4 + x * 0.15 - tm * 2);
			const norm = (wave + 1) * 0.5;

			const isCrest = Math.abs(wave) > 0.82;
			const charIdx = Math.floor(Math.abs(rowIdx * 16 + x + tm * 8) % (chars.length || 1));
			const charKey = isCrest ? '*' : chars[charIdx] ? chars[charIdx].character : '.';

			t.push();
			t.translate(x, y);
			t.charColor(
				isCrest ? 255 : Math.floor(200 + norm * 55),
				isCrest ? 220 : Math.floor(80 + norm * 120),
				isCrest ? 100 : Math.floor(20 + norm * 40)
			);
			t.cellColor(
				isCrest ? 45 : Math.floor(14 + norm * 16),
				isCrest ? 15 : Math.floor(4 + norm * 10),
				isCrest ? 10 : Math.floor(8 + norm * 10)
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
	const texRows = tileset.textureRows;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.TEXTUREROWS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ATLAS ROW STRATA SOUNDING', x, y++);
	t.charColor(140, 160, 190);
	t.print('Vertical texture row count.', x, y++);
	t.print('Defines GPU atlas row structure.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 140, 30);
	t.print(`TEXTURE ROWS: ${texRows}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
