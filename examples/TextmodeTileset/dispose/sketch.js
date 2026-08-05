/**
 * @title TextmodeTileset.dispose
 */
const T64_URL = 'https://littlebitspace.com/resources/fonts/T64.png';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let disposableTileset = null;
let fontReady = false;
let isDisposed = false;

t.setup(async () => {
	disposableTileset = await t.loadTileset({ source: T64_URL, columns: 16, rows: 16, count: 256, fontSize: 16 });
	fontReady = true;
});

t.mousePressed(() => {
	if (disposableTileset && !isDisposed) {
		disposableTileset.dispose();
		isDisposed = true;
	}
});

t.draw(() => {
	t.background(16, 6, 10);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;
	const activeChars = fontReady && !isDisposed && disposableTileset ? disposableTileset.characters : [];

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const wave = Math.sin(dist * 0.35 - tm * 2);
			const norm = (wave + 1) * 0.5;

			const charIdx = Math.floor(Math.abs(dist * 0.6 + tm * 6) % (activeChars.length || 1));
			const glyphObj = activeChars[charIdx];
			const charKey = isDisposed ? '.' : glyphObj ? glyphObj.character : '#';

			t.push();
			t.translate(x, y);
			t.charColor(
				isDisposed ? 90 : Math.floor(240 - norm * 140),
				isDisposed ? 40 : Math.floor(100 + norm * 140),
				isDisposed ? 50 : Math.floor(180 + norm * 75)
			);
			t.cellColor(
				isDisposed ? 18 : Math.floor(20 + norm * 15),
				isDisposed ? 6 : Math.floor(6 + norm * 10),
				isDisposed ? 8 : Math.floor(12 + norm * 20)
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

	const stateText = isDisposed ? 'DISPOSED (GPU MEMORY FREED)' : 'ACTIVE (GLYPH ATLAS READY)';

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.DISPOSE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: GPU ATLAS DISSOLVE MATRIX', x, y++);
	t.charColor(140, 160, 190);
	t.print('tileset.dispose() releases WebGL GPU', x, y++);
	t.print('textures and atlas framebuffer.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`STATUS: ${stateText}`, x, y++);
	t.charColor(255, 200, 100);
	t.print('CLICK CANVAS TO DISPOSE TILESET', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
