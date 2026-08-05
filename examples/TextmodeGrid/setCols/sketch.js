/**
 * @title TextmodeGrid.setCols
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const presets = [16, 32, 48, 64];
let presetIdx = 1;

t.setup(() => {
	t.grid.cols = presets[presetIdx];
});

t.mousePressed(() => {
	presetIdx = (presetIdx + 1) % presets.length;
	t.grid.cols = presets[presetIdx];
});

t.draw(() => {
	t.background(6, 14, 22);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const hw = Math.floor(cols / 2);
	const hh = Math.floor(rows / 2);
	const tm = t.frameCount * 0.05;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(x * 0.2 + tm) * Math.cos(y * 0.2 + tm);
			const norm = (wave + 1) * 0.5;

			const charKey = norm > 0.7 ? '#' : norm > 0.4 ? '+' : norm > 0.2 ? ':' : '.';

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(80 + norm * 175), Math.floor(200 + norm * 55), Math.floor(140 - norm * 60));
			t.cellColor(Math.floor(6 + norm * 10), Math.floor(18 + norm * 14), Math.floor(12 + norm * 16));
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
	t.print('TEXTMODEGRID.SETCOLS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: COLUMN DENSITY QUANTIZER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Sets column count and locks grid size', x, y++);
	t.print('until responsive() is called.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`LOCKED COLS: ${t.grid.cols}`, x, y++);
	t.charColor(255, 200, 100);
	t.print('CLICK CANVAS TO CYCLE COLS PRESETS', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
