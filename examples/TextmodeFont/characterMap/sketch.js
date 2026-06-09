/**
 * @title TextmodeFont.characterMap
 */
const BESCII_URL = 'https://cdn.jsdelivr.net/gh/damianvila/font-bescii@main/fonts/v2.0/Bescii-Mono.ttf';

const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let activeFont = null;
let fontReady = false;
let disposed = false;

t.setup(async () => {
	activeFont = await t.loadFont(BESCII_URL);
	fontReady = true;
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	if (!fontReady) return;
	const glyphs = activeFont.characters;
	const cols = activeFont.textureColumns;
	const rows = activeFont.textureRows;
	const startX = -Math.floor(cols / 2);
	const labelBottom = -Math.floor(t.grid.rows / 2) + 11;
	const bottomLimit = Math.floor(t.grid.rows / 2) - rows - 2;
	const startY = Math.max(labelBottom, Math.min(-Math.floor(rows / 2), bottomLimit));
	for (let i = 0; i < glyphs.length; i++) {
		const glyph = glyphs[i];
		t.push();
		t.translate(startX + (i % cols), startY + Math.floor(i / cols));
		t.char(glyph.character);
		t.charColor(120 + (i % cols) * 8, 220, 255 - (i % rows) * 12);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODEFONT.CHARACTERMAP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: GLYPH ATLAS DATA', x, y++, 100, 220, 255);
	drawText('Bescii web font feeds glyphs.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	if (!fontReady) {
		drawText('LOADING BESCII...', x, y++, 255, 225, 140);
		return;
	}
	const glyph = activeFont.characters[Math.floor(t.frameCount / 12) % activeFont.characters.length];
	const found = activeFont.characterMap.has(glyph.character);
	drawText(`CHAR: ${glyph.character}`, x, y++, 255, 225, 140);
	drawText(`IN MAP: ${found}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
