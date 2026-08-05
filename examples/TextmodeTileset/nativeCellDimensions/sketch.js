/**
 * @title TextmodeTileset.nativeCellDimensions
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
	t.background(10, 10, 16);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;
	const chars = tileset.characters;
	const nDims = tileset.nativeCellDimensions;

	const lensX = Math.sin(tm) * 14;
	const lensY = Math.cos(tm * 0.7) * 9;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dLens = Math.hypot(x - lensX, y - lensY);
			const inLens = dLens < 8;
			const isRing = Math.abs(dLens - 8) < 0.8;

			const scale = inLens ? nDims.width / 4 : 1;
			const charIdx = Math.floor(Math.abs(x * scale + y * scale + tm * 8) % (chars.length || 1));
			const charKey = isRing ? '+' : chars[charIdx] ? chars[charIdx].character : ' ';

			t.push();
			t.translate(x, y);
			t.charColor(
				isRing ? 255 : inLens ? 100 : 70,
				isRing ? 220 : inLens ? 240 : 120,
				isRing ? 100 : inLens ? 180 : 160
			);
			t.cellColor(isRing ? 30 : inLens ? 22 : 8, isRing ? 20 : inLens ? 14 : 6, isRing ? 10 : inLens ? 18 : 10);
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
	const nDims = tileset.nativeCellDimensions;
	const cellDims = tileset.cellDimensions;
	const scaleFactor = (cellDims.height / (nDims.height || 1)).toFixed(2);

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.NATIVECELLDIMENSIONS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: SWEEPING LENS RETICLE PASS', x, y++);
	t.charColor(140, 160, 190);
	t.print('Native pixel dimensions in source sheet.', x, y++);
	t.print('Compared against effective render size.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`NATIVE SIZE : ${nDims.width} x ${nDims.height} PX`, x, y++);
	t.print(`SCALE RATIO : ${scaleFactor}X`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
