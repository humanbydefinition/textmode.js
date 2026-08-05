/**
 * @title TextmodeFont.creation
 */
const BESCII_URL = 'https://cdn.jsdelivr.net/gh/damianvila/font-bescii@main/fonts/v2.0/Bescii-Mono.ttf';

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let customFont = null;
let fontReady = false;

t.setup(async () => {
	customFont = await t.loadFont(BESCII_URL);
	fontReady = true;
});

t.draw(() => {
	t.background(6, 14, 18);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;
	const active = fontReady && customFont ? customFont : t.font;
	const glyphs = active.characters;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const gridX = Math.abs(x) % 6 === 0;
			const gridY = Math.abs(y) % 6 === 0;
			const wave = Math.sin(x * 0.2 + y * 0.2 + tm);
			const norm = (wave + 1) * 0.5;

			const gIdx = Math.floor((Math.abs(x * y) + tm * 10) % (glyphs.length || 1));
			const glyphObj = glyphs[gIdx] || glyphs[0];
			const char = gridX || gridY ? '+' : glyphObj ? glyphObj.character : '.';

			t.push();
			t.translate(x, y);
			t.charColor(
				gridX || gridY ? 255 : Math.floor(40 + norm * 180),
				Math.floor(180 + norm * 75),
				gridX || gridY ? 180 : Math.floor(220 - norm * 100)
			);
			t.cellColor(Math.floor(6 + norm * 12), Math.floor(18 + norm * 20), Math.floor(25 + norm * 25));
			t.char(char);
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

	const status = fontReady ? 'FONT LOADED (BESCII)' : 'LOADING FONT...';
	const glyphCount = fontReady && customFont ? customFont.characters.length : t.font.characters.length;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEFONT.CREATION', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ASYNC FONT LOADING', x, y++);
	t.charColor(140, 160, 190);
	t.print('loadFont(url) parses TrueType/WOFF', x, y++);
	t.print('and constructs WebGL glyph atlas.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`STATUS: ${status}`, x, y++);
	t.print(`GLYPHS LOADED: ${glyphCount}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
