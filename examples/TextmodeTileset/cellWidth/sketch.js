/**
 * @title TextmodeTileset.cellWidth
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
	t.background(4, 16, 12);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.06;
	const chars = tileset.characters;
	const cW = tileset.cellWidth;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(x * (cW * 0.01) - tm * 3 + Math.sin(y * 0.25) * 3);
			const norm = (wave + 1) * 0.5;

			const isBeam = Math.abs(wave) > 0.85;
			const charIdx = Math.floor(Math.abs(x * 2 + Math.cos(y * 0.2 + tm * 3) * 6) % (chars.length || 1));
			const charKey = isBeam ? '=' : chars[charIdx] ? chars[charIdx].character : '-';

			t.push();
			t.translate(x, y);
			t.charColor(
				isBeam ? 255 : Math.floor(40 + norm * 180),
				isBeam ? 240 : Math.floor(220 - norm * 80),
				isBeam ? 120 : Math.floor(140 + norm * 100)
			);
			t.cellColor(
				isBeam ? 24 : Math.floor(6 + norm * 10),
				isBeam ? 35 : Math.floor(20 + norm * 20),
				isBeam ? 20 : Math.floor(14 + norm * 15)
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
	const width = tileset.cellWidth;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.CELLWIDTH', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: HORIZON WIDTH PULSE SCANNER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Effective render cell width in px.', x, y++);
	t.print('Controls horizontal column stride.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`CELL WIDTH: ${width} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
