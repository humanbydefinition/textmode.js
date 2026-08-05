/**
 * @title TextmodeFont.textureColumns
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 12, 18);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;
	const texCols = t.font.textureColumns || 16;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const colIndex = Math.abs(x) % texCols;
			const normCol = colIndex / texCols;
			const wave = Math.sin(colIndex * 0.5 + y * 0.15 + tm);
			const norm = (wave + 1) * 0.5;

			const idx = Math.floor(norm * (RAMP.length - 1));
			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(40 + normCol * 210), Math.floor(200 - normCol * 100), Math.floor(160 + norm * 80));
			t.cellColor(Math.floor(8 + normCol * 15), Math.floor(20 + norm * 20), Math.floor(30 + normCol * 20));
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

	const texCols = t.font.textureColumns;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEFONT.TEXTURECOLUMNS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ATLAS TEXTURE COLUMNS', x, y++);
	t.charColor(140, 160, 190);
	t.print('Number of horizontal atlas slots.', x, y++);
	t.print('Determines atlas UV column layout.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TEXTURE COLUMNS: ${texCols}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
