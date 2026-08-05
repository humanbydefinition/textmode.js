/**
 * @title TextmodeTileset.rows
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
	t.background(24, 10, 16);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;
	const chars = tileset.characters;
	const numRows = tileset.rows;

	for (let y = -hh; y <= hh; y++) {
		const rowIndex = Math.abs(y) % numRows;

		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(rowIndex * 0.4 + x * 0.12 - tm * 2);
			const norm = (wave + 1) * 0.5;

			const isCrest = Math.abs(wave) > 0.82;
			const charIdx = Math.floor(Math.abs(rowIndex * 16 + x + tm * 8) % (chars.length || 1));
			const charKey = isCrest ? '*' : chars[charIdx] ? chars[charIdx].character : '.';

			t.push();
			t.translate(x, y);
			t.charColor(
				isCrest ? 255 : Math.floor(180 + norm * 60),
				isCrest ? 210 : Math.floor(90 + norm * 90),
				isCrest ? 90 : Math.floor(40 + norm * 60)
			);
			t.cellColor(
				isCrest ? 45 : Math.floor(12 + norm * 15),
				isCrest ? 20 : Math.floor(4 + norm * 10),
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
	const numRows = tileset.rows;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.ROWS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: SEISMIC GEOLOGICAL STRATA', x, y++);
	t.charColor(140, 160, 190);
	t.print('Maps tileset atlas row count.', x, y++);
	t.print('Structures horizontal grid strata.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 210, 90);
	t.print(`ATLAS ROWS: ${numRows}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
