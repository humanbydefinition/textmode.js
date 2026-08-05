/**
 * @title Textmodifier.inputGrid
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const inputLayer = t.layers.add();
let locked = false;

t.setup(() => {
	inputLayer.grid.cols = 24;
	inputLayer.grid.rows = 12;
});

t.mouseClicked(() => {
	locked = !locked;
	t.inputGrid(locked ? inputLayer.grid : 'topmost');
});

t.draw(() => {
	t.background(6, 10, 22);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const sweepAngle = t.frameCount * 0.05;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const isSweep = Math.abs((Math.atan2(y, x) - sweepAngle) % (Math.PI * 2)) < 0.2 && dist < 16;

			t.push();
			t.translate(x, y);
			t.charColor(
				isSweep ? 0 : Math.abs(dist - 12) < 0.5 ? 40 : 20,
				isSweep ? 240 : Math.abs(dist - 12) < 0.5 ? 100 : 35,
				isSweep ? 180 : Math.abs(dist - 12) < 0.5 ? 160 : 60
			);
			t.cellColor(isSweep ? 10 : 6, isSweep ? 45 : 10, isSweep ? 35 : 22);
			t.char(isSweep ? '@' : Math.abs(dist - 12) < 0.5 ? '+' : '.');
			t.point();
			t.pop();
		}
	}
});

inputLayer.draw(() => {
	t.clear();
	const hw = Math.floor(inputLayer.grid.cols / 2);
	const hh = Math.floor(inputLayer.grid.rows / 2);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			if (Math.abs(x) === hw || Math.abs(y) === hh) {
				t.push();
				t.translate(x, y);
				t.charColor(100, 220, 255);
				t.cellColor(15, 35, 50);
				t.char('+');
				t.point();
				t.pop();
			}
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
	t.print('TEXTMODIFIER.INPUTGRID', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: INPUT MAPPING GRID LOCK', x, y++);
	t.charColor(140, 160, 190);
	t.print('Click canvas to lock inputGrid layer.', x, y++);
	t.print('Maps mouse coords to targeted sub-grid.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 200, 100);
	t.print(`INPUT GRID MODE: ${locked ? 'LOCKED' : 'TOPMOST'}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
