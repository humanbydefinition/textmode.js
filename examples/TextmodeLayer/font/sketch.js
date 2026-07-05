/**
 * @title TextmodeLayer.font
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const bigFontLayer = t.layers.add({ fontSize: 32, blendMode: 'additive' });
const labelLayer = t.layers.add();

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();
});

bigFontLayer.draw(() => {
	t.clear();
	const font = bigFontLayer.font;
	const chars = font.characters;
	const time = t.frameCount * 0.02;

	const cols = 8;
	const rows = 3;

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const idx = (r * cols + c + Math.floor(time * 10)) % chars.length;
			const glyph = chars[idx];

			t.push();
			t.translate(c - Math.floor(cols / 2), r - Math.floor(rows / 2));
			t.char(glyph.character);
			t.charColor(120, 180, 255);
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
	const baseSize = t.layers.base.font.fontSize;
	const layerSize = bigFontLayer.font.fontSize;

	drawText('TEXTMODELAYER.FONT', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: LAYER FONT STATE', x, y++, [100, 220, 255]);
	drawText('Base and overlay keep fonts apart.', x, y++, [140, 160, 190]);
	drawText('Large font layer uses additive.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`BASE FONT: ${baseSize} PX`, x, y++, [140, 180, 255]);
	drawText(`LAYER FONT: ${layerSize} PX`, x, y++, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
