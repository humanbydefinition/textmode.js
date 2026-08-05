/**
 * @title TextmodeGrid.responsive
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let isManual = false;

t.setup(() => {});

t.mousePressed(() => {
	isManual = !isManual;
	if (isManual) {
		t.grid.cols = 32;
		t.grid.rows = 16;
	} else {
		t.grid.responsive();
		t.grid.reset();
	}
});

t.draw(() => {
	t.background(8, 12, 26);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const hw = Math.floor(cols / 2);
	const hh = Math.floor(rows / 2);
	const tm = t.frameCount * 0.04;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(x * 0.2 + tm) * Math.cos(y * 0.2 - tm);
			const norm = (wave + 1) * 0.5;

			const charKey = isManual ? (norm > 0.5 ? '#' : '=') : norm > 0.6 ? '*' : norm > 0.3 ? '+' : '.';

			t.push();
			t.translate(x, y);
			t.charColor(
				isManual ? 255 : Math.floor(80 + norm * 160),
				isManual ? Math.floor(140 + norm * 100) : Math.floor(200 + norm * 55),
				isManual ? 100 : Math.floor(140 - norm * 60)
			);
			t.cellColor(isManual ? 24 : 8, isManual ? 12 : 16, isManual ? 8 : 28);
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

	const modeText = isManual ? 'MANUAL LOCKED (32x16)' : 'AUTO RESPONSIVE';

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODEGRID.RESPONSIVE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: RESPONSIVE AUTO-SIZING TOGGLE', x, y++);
	t.charColor(140, 160, 190);
	t.print('Restores responsive sizing so resizes', x, y++);
	t.print('recalculate columns and rows.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`GRID SIZING: ${modeText}`, x, y++);
	t.charColor(255, 200, 100);
	t.print('CLICK CANVAS TO TOGGLE RESPONSIVE', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
