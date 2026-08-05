/**
 * @title TextmodeTileset.characterMap
 */
const T64_URL = 'https://littlebitspace.com/resources/fonts/T64.png';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const KEYS = '@#$%&*<>[]{}~+=-';
let tileset = null;

t.setup(async () => {
	tileset = await t.loadTileset({ source: T64_URL, columns: 16, rows: 16, count: 256, fontSize: 16 });
});

t.draw(() => {
	t.background(4, 8, 6);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.06;

	const map = tileset.characterMap;

	for (let x = -hw; x <= hw; x++) {
		const dropSpeed = (Math.abs(x * 17) % 5) + 2;
		const dropY = Math.floor((tm * dropSpeed + Math.abs(x * 11)) % (t.grid.rows + 10)) - hh;

		for (let y = -hh; y <= hh; y++) {
			const distFromHead = dropY - y;
			if (distFromHead >= 0 && distFromHead < 12) {
				const charStr = KEYS[Math.abs(x * 3 + y) % KEYS.length];
				const hasMapKey = map ? map.has(charStr) : false;
				const isHead = distFromHead === 0;

				t.push();
				t.translate(x, y);
				t.charColor(
					isHead ? 255 : 80,
					isHead ? 255 : Math.floor(220 - distFromHead * 15),
					isHead ? 200 : Math.floor(60 - distFromHead * 4)
				);
				t.cellColor(4, isHead ? 40 : 12, 8);
				t.char(hasMapKey ? charStr : '.');
				t.point();
				t.pop();
			}
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	if (!tileset) return;
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const mapSize = tileset.characterMap ? tileset.characterMap.size : 0;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.CHARACTERMAP', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: SYMBOLIC CIPHER RAIN', x, y++);
	t.charColor(140, 160, 190);
	t.print('Queries characterMap key lookups.', x, y++);
	t.print('Maps glyph symbols to atlas indices.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(120, 255, 40);
	t.print(`MAP SIZE: ${mapSize} ENTRIES`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
