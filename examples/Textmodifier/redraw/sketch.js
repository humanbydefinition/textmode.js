/**
 * @title Textmodifier.redraw
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let steps = 0;
let lastRequest = 1;

t.setup(() => {
	t.noLoop();
});

t.mousePressed(() => {
	lastRequest = 1;
	t.redraw();
});

t.keyPressed(() => {
	lastRequest = 5;
	t.redraw(5);
});

t.draw(() => {
	steps++;
	t.background(8, 10, 20);

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = steps * 0.15;

	const traceRamp = '*o+:.';

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const liss1 = Math.sin(x * 0.15 + tm) * Math.cos(y * 0.2 - tm);
			const liss2 = Math.sin(Math.hypot(x, y) * 0.12 - tm * 0.5);
			const norm = (liss1 + liss2 + 2) / 4;

			t.push();
			t.translate(x, y);

			const idx = Math.floor(norm * (traceRamp.length - 1));
			t.charColor(255, Math.floor(170 * norm), Math.floor(40 + norm * 180));
			t.cellColor(16, 24, 45);
			t.char(traceRamp[idx]);

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
	t.print('TEXTMODIFIER.REDRAW', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: LISSAJOUS CHRONOPHOTOGRAPHY', x, y++);
	t.charColor(140, 160, 190);
	t.print('setup() pauses with noLoop().', x, y++);
	t.print('redraw(n) executes n discrete frames.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 180);
	t.print(`TOTAL FRAMES EXECUTED: ${steps}`, x, y++);
	t.charColor(255, 220, 140);
	t.print(`LAST REQUEST: ${lastRequest} FRAME(S)`, x, y++);
	t.print('CLICK: REDRAW 1 | ANY KEY: REDRAW 5', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
