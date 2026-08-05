/**
 * @title TextmodeFont.textureRows
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(16, 6, 12);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;
	const texRows = t.font.textureRows || 16;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const rowIndex = Math.abs(y) % texRows;
			const normRow = rowIndex / texRows;
			const wave = Math.cos(rowIndex * 0.5 + x * 0.15 + tm);
			const norm = (wave + 1) * 0.5;

			const idx = Math.floor(norm * (RAMP.length - 1));
			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(240 - normRow * 100), Math.floor(60 + normRow * 180), Math.floor(160 + norm * 80));
			t.cellColor(Math.floor(24 + normRow * 20), Math.floor(6 + norm * 15), Math.floor(15 + normRow * 15));
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

	const texRows = t.font.textureRows;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEFONT.TEXTUREROWS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ATLAS TEXTURE ROWS', x, y++);
	t.charColor(140, 160, 190);
	t.print('Number of vertical atlas slots.', x, y++);
	t.print('Determines atlas UV row layout.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TEXTURE ROWS: ${texRows}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
