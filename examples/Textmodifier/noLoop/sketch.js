/**
 * @title Textmodifier.noLoop
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let paused = false;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.mousePressed(() => {
	if (t.isLooping()) {
		paused = true;
		t.noLoop();
		t.redraw();
	} else {
		paused = false;
		t.loop();
	}
});

t.draw(() => {
	t.background(6, 10, 22);
	t.rotateZ(t.frameCount * 4);
	t.char('#');
	t.charColor(255, 210, 120);
	t.rect(12, 2);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.NOLOOP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PAUSE DRAW LOOP', x, y++, 100, 220, 255);
	drawText('Click toggles noLoop/loop.', x, y++, 140, 160, 190);
	drawText('Events still resume drawing.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const state = paused ? 'PAUSED' : 'LOOPING';
	drawText(`STATE: ${state}`, x, y++, 140, 255, 180);
	drawText('CLICK: TOGGLE LOOP', x, y++, 255, 225, 140);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
