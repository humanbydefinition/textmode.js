/**
 * @title TextmodeGrid.setRows
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const presets = [12, 24, 36, 48];
let presetIdx = 1;

t.setup(() => {
	t.grid.rows = presets[presetIdx];
});

t.mousePressed(() => {
	presetIdx = (presetIdx + 1) % presets.length;
	t.grid.rows = presets[presetIdx];
});

t.draw(() => {
	t.background(14, 8, 20);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const hw = Math.floor(cols / 2);
	const hh = Math.floor(rows / 2);
	const tm = t.frameCount * 0.05;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const wave = Math.cos(x * 0.2 - tm) * Math.sin(y * 0.2 + tm);
			const norm = (wave + 1) * 0.5;

			const charKey = norm > 0.7 ? '%' : norm > 0.4 ? '*' : norm > 0.2 ? '=' : '-';

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(220 + norm * 35), Math.floor(120 + norm * 100), Math.floor(80 + norm * 120));
			t.cellColor(Math.floor(20 + norm * 12), Math.floor(8 + norm * 10), Math.floor(14 + norm * 16));
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

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEGRID.SETROWS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ROW DENSITY QUANTIZER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Sets row count and locks grid size', x, y++);
	t.print('until responsive() is called.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`LOCKED ROWS: ${t.grid.rows}`, x, y++);
	t.charColor(255, 200, 100);
	t.print('CLICK CANVAS TO CYCLE ROWS PRESETS', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
