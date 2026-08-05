/**
 * @title TextmodeTileset.cellDimensions
 */
const T64_URL = 'https://littlebitspace.com/resources/fonts/T64.png';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const RAMP = ' .:-+*#@';
let tileset = null;

t.setup(async () => {
	tileset = await t.loadTileset({ source: T64_URL, columns: 16, rows: 16, count: 256, fontSize: 16 });
});

t.draw(() => {
	t.background(8, 18, 38);
	if (!tileset) return;

	const dims = tileset.cellDimensions;
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;

	const ratio = dims.width / (dims.height || 1);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.abs(x * ratio) + Math.abs(y);
			const ring = (Math.sin(dist * 0.4 - tm) + 1) * 0.5;

			const isCross = x === 0 || y === 0;

			if (ring > 0.45 || isCross) {
				const val = isCross ? 1 : (ring - 0.45) / 0.55;
				const idx = Math.floor(val * (RAMP.length - 1));

				t.push();
				t.translate(x, y);
				t.charColor(
					isCross ? 0 : Math.floor(100 + val * 40),
					isCross ? 230 : Math.floor(200 + val * 55),
					isCross ? 255 : Math.floor(60 + val * 20)
				);
				t.cellColor(4, Math.floor(14 + val * 20), Math.floor(30 + val * 20));
				t.char(RAMP[idx]);
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

	const d = tileset.cellDimensions;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.CELLDIMENSIONS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: OPTICAL CALIBRATION RETICLE', x, y++);
	t.charColor(140, 160, 190);
	t.print('Measures tile width & height in px.', x, y++);
	t.print('Scales reticle aspect ratio.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 80);
	t.print(`TILE DIMS: ${d.width}x${d.height} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
