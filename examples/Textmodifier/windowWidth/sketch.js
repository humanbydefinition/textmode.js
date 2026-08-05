/**
 * @title Textmodifier.windowWidth
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let winW = 0;

t.draw(() => {
	t.background(5, 10, 18);
	winW = t.windowWidth;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const ratio = t.constrain(winW / Math.max(1, t.displayWidth), 0.1, 1);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const eqHeight = Math.round((Math.sin(x * 0.3 * ratio + t.frameCount * 0.05) + 1) * (hh * 0.4));
			const isBar = Math.abs(y) <= eqHeight;

			t.push();
			t.translate(x, y);

			if (isBar) {
				t.charColor(Math.floor(100 + ratio * 155), Math.floor(180 + ratio * 75), 255);
				t.cellColor(15, 30, 50);
				t.char(Math.abs(y) === eqHeight ? '=' : '#');
			} else {
				t.charColor(20, 35, 60);
				t.cellColor(5, 10, 18);
				t.char('.');
			}

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
	t.print('TEXTMODIFIER.WINDOWWIDTH', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: VIEWPORT WIDTH EQUALIZER', x, y++);
	t.charColor(140, 160, 190);
	t.print('windowWidth reads window.innerWidth.', x, y++);
	t.print('Resize window to compress frequency.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 180);
	t.print(`WINDOW WIDTH: ${winW} PX`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
