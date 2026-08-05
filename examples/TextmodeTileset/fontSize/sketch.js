/**
 * @title TextmodeTileset.fontSize
 */
const T64_URL = 'https://littlebitspace.com/resources/fonts/T64.png';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const labelLayer = t.layers.add();
let tileset = null;

t.setup(async () => {
	tileset = await t.loadTileset({ source: T64_URL, columns: 16, rows: 16, count: 256, fontSize: 16 });
});

t.draw(() => {
	t.background(6, 6, 16);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03;
	const chars = tileset.characters;

	const cx = -0.7 + Math.sin(tm) * 0.1;
	const cy = 0.27015 + Math.cos(tm * 0.7) * 0.05;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			let zx = (x / hw) * 1.5;
			let zy = (y / hh) * 1.5;
			let iter = 0;
			for (let i = 0; i < 16; i++) {
				if (zx * zx + zy * zy > 4) break;
				const xtemp = zx * zx - zy * zy + cx;
				zy = 2 * zx * zy + cy;
				zx = xtemp;
				iter++;
			}
			const norm = iter / 16;

			const charIdx = Math.floor(Math.abs(norm * chars.length + tm * 8) % (chars.length || 1));
			const charKey = chars[charIdx] ? chars[charIdx].character : ' ';

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(255 - norm * 180), Math.floor(100 + norm * 155), Math.floor(60 + norm * 195));
			t.cellColor(Math.floor(8 + norm * 20), Math.floor(6 + norm * 15), Math.floor(20 + norm * 20));
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
	const sz = tileset.fontSize;
	const dims = tileset.cellDimensions;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.FONTSIZE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: JULIA FRACTAL SAMPLING', x, y++);
	t.charColor(140, 160, 190);
	t.print('Configures output cell render scale.', x, y++);
	t.print('Does not alter native source tile size.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`FONT SIZE: ${sz} PX`, x, y++);
	t.print(`CELL DIMS: ${dims.width} x ${dims.height} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
