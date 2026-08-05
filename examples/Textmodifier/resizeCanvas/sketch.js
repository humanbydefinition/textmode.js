/**
 * @title Textmodifier.resizeCanvas
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let manualResizeCount = 0;

t.mouseClicked(() => {
	manualResizeCount++;
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

t.draw(() => {
	t.background(6, 10, 22);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	const irisRadius = Math.abs(Math.sin(t.frameCount * 0.03)) * (hh * 0.7) + 4;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const isIris = Math.abs(dist - irisRadius) < 1.2;

			t.push();
			t.translate(x, y);

			if (isIris) {
				t.charColor(255, 180, 60);
				t.cellColor(45, 25, 10);
				t.char('O');
			} else if (dist < irisRadius) {
				t.charColor(100, 220, 255);
				t.cellColor(12, 30, 50);
				t.char('o');
			} else {
				t.charColor(20, 35, 60);
				t.cellColor(6, 10, 22);
				t.char(x % 2 === 0 && y % 2 === 0 ? '+' : '.');
			}

			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 1;
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.RESIZECANVAS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: MANUAL CANVAS RESIZING', x, y++);
	t.charColor(140, 160, 190);
	t.print('Click canvas to invoke resizeCanvas.', x, y++);
	t.print('Reconfigures backing store & grid.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 200, 80);
	t.print(`RESIZE CALLS: ${manualResizeCount}`, x, y++);
	t.charColor(140, 255, 200);
	t.print(`CANVAS SIZE: ${t.width}x${t.height}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
