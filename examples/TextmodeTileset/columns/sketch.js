/**
 * @title TextmodeTileset.columns
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
	t.background(4, 18, 26);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;
	const chars = tileset.characters;
	const numCols = tileset.columns;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const colIndex = Math.abs(x) % numCols;
			const colWave = Math.sin(colIndex * ((Math.PI * 2) / numCols) + tm * 2.5 + Math.cos(y * 0.15) * 1.5);
			const norm = (colWave + 1) * 0.5;

			const isPeak = Math.abs(colWave) > 0.85;
			const charIdx = Math.floor(Math.abs(colIndex * 16 + y + tm * 10) % (chars.length || 1));
			const charKey = isPeak ? '#' : chars[charIdx] ? chars[charIdx].character : ':';

			t.push();
			t.translate(x, y);
			t.charColor(
				isPeak ? 255 : Math.floor(20 + norm * 160),
				isPeak ? 255 : Math.floor(180 + norm * 75),
				isPeak ? 200 : Math.floor(140 + (colIndex / numCols) * 115)
			);
			t.cellColor(
				isPeak ? 15 : Math.floor(4 + norm * 10),
				isPeak ? 45 : Math.floor(16 + norm * 20),
				isPeak ? 50 : Math.floor(20 + norm * 25)
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
	const cols = tileset.columns;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.COLUMNS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: 16-CHANNEL SPECTRUM MATRIX', x, y++);
	t.charColor(140, 160, 190);
	t.print('Partitions atlas into column bands.', x, y++);
	t.print('Drives column phase offset wave.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(0, 240, 180);
	t.print(`ATLAS COLUMNS: ${cols}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
