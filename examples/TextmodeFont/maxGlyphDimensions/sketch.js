/**
 * @title TextmodeFont.maxGlyphDimensions
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(8, 8, 18);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;
	const dims = t.font.maxGlyphDimensions;

	const boxW = Math.max(3, Math.floor(dims.width / 4));
	const boxH = Math.max(3, Math.floor(dims.height / 4));

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const bx = Math.floor((x + hw) / boxW);
			const by = Math.floor((y + hh) / boxH);
			const norm = (Math.sin(bx * 0.5 + by * 0.5 + tm) + 1) * 0.5;

			const idx = Math.floor(norm * (RAMP.length - 1));
			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(240 - norm * 140), Math.floor(140 + norm * 110), Math.floor(40 + norm * 200));
			t.cellColor(Math.floor(25 - norm * 15), Math.floor(10 + norm * 15), Math.floor(8 + norm * 20));
			t.char(RAMP[idx]);
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

	const dims = t.font.maxGlyphDimensions;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEFONT.MAXGLYPHDIMENSIONS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: MAX GLYPH CELL BOUNDS', x, y++);
	t.charColor(140, 160, 190);
	t.print('Maximum cell bounding dimensions.', x, y++);
	t.print('Determines atlas cell slot size.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`MAX DIMS: ${dims.width} x ${dims.height} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
