/**
 * @title TextmodeFont.dispose
 */
const BESCII_URL = 'https://cdn.jsdelivr.net/gh/damianvila/font-bescii@main/fonts/v2.0/Bescii-Mono.ttf';

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let disposableFont = null;
let fontReady = false;
let isDisposed = false;

t.setup(async () => {
	disposableFont = await t.loadFont(BESCII_URL, false);
	fontReady = true;
});

t.mousePressed(() => {
	if (disposableFont && !isDisposed) {
		disposableFont.dispose();
		isDisposed = true;
	}
});

t.draw(() => {
	t.background(16, 6, 10);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03;
	const active = fontReady && !isDisposed && disposableFont ? disposableFont : t.font;
	const glyphs = active.characters;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const field = isDisposed ? Math.sin(x * 0.4 + y * 0.4 + tm) * 0.2 : Math.sin(dist * 0.3 - tm * 2);
			const norm = (field + 1) * 0.5;

			const gIdx = Math.floor(Math.abs(dist * 0.6 + Math.atan2(y, x) * 4 - tm * 8) % (glyphs.length || 1));
			const glyphObj = glyphs[gIdx] || glyphs[0];
			const char = isDisposed ? '.' : glyphObj ? glyphObj.character : ' ';

			t.push();
			t.translate(x, y);
			t.charColor(
				isDisposed ? 90 : Math.floor(220 - norm * 140),
				isDisposed ? 40 : Math.floor(100 + norm * 140),
				isDisposed ? 50 : Math.floor(180 + norm * 75)
			);
			t.cellColor(
				isDisposed ? 18 : Math.floor(20 + norm * 15),
				isDisposed ? 6 : Math.floor(6 + norm * 10),
				isDisposed ? 8 : Math.floor(12 + norm * 20)
			);
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

	const stateText = isDisposed ? 'DISPOSED (RELEASED)' : 'ACTIVE (GLYPH ATLAS READY)';

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEFONT.DISPOSE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: FONT RESOURCE CLEANUP', x, y++);
	t.charColor(140, 160, 190);
	t.print('font.dispose() frees WebGL textures', x, y++);
	t.print('and atlas framebuffer memory.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`STATUS: ${stateText}`, x, y++);
	t.charColor(255, 200, 100);
	t.print('CLICK CANVAS TO DISPOSE FONT', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
