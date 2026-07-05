/**
 * @title Textmodifier.pressedKeys
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
	const keys = Array.from(t.pressedKeys);
	keys.forEach((key, index) => {
		t.push();
		t.translate(index * 2 - keys.length, 0);
		t.char(String(key)[0] || '?');
		t.charColor(255, 210, 120);
		t.point();
		t.pop();
	});
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.PRESSEDKEYS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ALL HELD KEYS', x, y++, 100, 220, 255);
	drawText('Set lists currently held keys.', x, y++, 140, 160, 190);
	drawText('Each key renders in center.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`COUNT: ${t.pressedKeys.size}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
