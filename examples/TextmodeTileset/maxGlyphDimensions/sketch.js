/**
 * @title TextmodeTileset.maxGlyphDimensions
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
	t.background(8, 24, 48);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;
	const chars = tileset.characters;
	const maxDims = tileset.maxGlyphDimensions;

	const boundW = Math.max(3, Math.floor(maxDims.width * 0.6));
	const boundH = Math.max(3, Math.floor(maxDims.height * 0.6));

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const relX = Math.abs(x) % (boundW + 4);
			const relY = Math.abs(y) % (boundH + 4);

			const isEdgeX = relX === boundW;
			const isEdgeY = relY === boundH;
			const isVertex = isEdgeX && isEdgeY;
			const isWire = isEdgeX || isEdgeY;

			const charIdx = Math.floor(Math.abs(x * 2 + y * 2 + tm * 6) % (chars.length || 1));
			const charKey = isVertex ? '+' : isWire ? (chars[charIdx] ? chars[charIdx].character : '#') : ' ';

			if (isWire) {
				t.push();
				t.translate(x, y);
				t.charColor(isVertex ? 255 : 40, isVertex ? 255 : 240, isVertex ? 255 : 140);
				t.cellColor(isVertex ? 40 : 12, isVertex ? 50 : 28, isVertex ? 30 : 20);
				t.char(charKey);
				t.point();
				t.pop();
			}
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
	const maxDims = tileset.maxGlyphDimensions;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.MAXGLYPHDIMENSIONS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: CAD CALIPER GRID STAGING', x, y++);
	t.charColor(140, 160, 190);
	t.print('Bounding box of largest atlas tile.', x, y++);
	t.print('Establishes max tile cell bounds.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(40, 240, 140);
	t.print(`MAX BOUNDS: ${maxDims.width} x ${maxDims.height} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
