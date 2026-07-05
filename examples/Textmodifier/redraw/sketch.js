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

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	steps++;
	t.background(6, 8, 14);

	const width = Math.max(12, Math.floor(t.grid.cols * 0.6));
	for (let i = 0; i < width; i++) {
		const phase = steps * 0.32 + i * 0.45;
		const x = i - Math.floor(width / 2);
		const y = Math.round(Math.sin(phase) * 5);
		t.push();
		t.translate(x, y + 2);
		t.char(i % 3 === 0 ? '+' : '*');
		t.charColor(90 + (i % 12) * 12, 200, 255);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.REDRAW', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: MANUAL RENDER STEPS', x, y++, 100, 220, 255);
	drawText('setup pauses with noLoop().', x, y++, 140, 160, 190);
	drawText('redraw(n) renders n frames.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`FRAMES: ${steps}`, x, y++, 140, 255, 180);
	drawText(`LAST REQUEST: ${lastRequest}`, x, y++, 255, 225, 140);
	drawText('CLICK: REDRAW 1', x, y++, 255, 225, 140);
	drawText('ANY KEY: REDRAW 5', x, y++, 255, 225, 140);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
