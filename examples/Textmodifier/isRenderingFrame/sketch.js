/**
 * @title Textmodifier.isRenderingFrame
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let outsideFrameFlag = false;

setInterval(() => {
	outsideFrameFlag = t.isRenderingFrame;
}, 100);

t.draw(() => {
	t.background(10, 12, 18);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.06;

	const inside = t.isRenderingFrame;
	const innerRadius = 8 + Math.floor(Math.sin(tm) * 3);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const isCore = dist <= innerRadius;

			t.push();
			t.translate(x, y);

			if (isCore) {
				t.charColor(40, 230, 210);
				t.cellColor(15, 45, 55);
				t.char(inside ? '#' : '0');
			} else if (dist <= innerRadius + 4) {
				t.charColor(255, 90, 180);
				t.cellColor(35, 15, 30);
				t.char('=');
			} else {
				t.charColor(40, 60, 90);
				t.cellColor(10, 12, 18);
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

	const inside = t.isRenderingFrame;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.ISRENDERINGFRAME', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: DUAL-BUFFER PIPELINE GATE', x, y++);
	t.charColor(140, 160, 190);
	t.print('isRenderingFrame is true only inside', x, y++);
	t.print('active frame render callbacks.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 90, 180);
	t.print(`INSIDE DRAW(): ${inside ? 'TRUE' : 'FALSE'}`, x, y++);
	t.charColor(140, 180, 220);
	t.print(`OUTSIDE DRAW(): ${outsideFrameFlag ? 'TRUE' : 'FALSE'}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
