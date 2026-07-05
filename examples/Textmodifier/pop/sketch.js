/**
 * @title Textmodifier.pop
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	const time = t.frameCount * 0.03;
	t.push();
	t.rotateZ(time * 30);
	t.translate(10, 0);
	t.char('#');
	t.charColor(140, 255, 180);
	t.rect(4, 3);
	t.pop();
	t.charColor(255, 210, 120);
	t.char('+');
	t.rect(5, 1);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.POP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RESTORE STATE', x, y++, 100, 220, 255);
	drawText('pop() returns to prior state.', x, y++, 140, 160, 190);
	drawText('Center mark is not rotated.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('API: t.pop()', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
