/**
 * @title Textmodifier.keyTyped
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let typed = '';

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.keyTyped((data) => {
	typed = (typed + (data.key || '')).slice(-16);
});

t.draw(() => {
	t.background(6, 10, 22);
	for (let i = 0; i < typed.length; i++) {
		t.push();
		t.translate(i - typed.length / 2, 0);
		t.char(typed[i]);
		t.charColor(255, 210, 120);
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
	drawText('TEXTMODIFIER.KEYTYPED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PRINTABLE INPUT', x, y++, 100, 220, 255);
	drawText('Collects typed characters.', x, y++, 140, 160, 190);
	drawText('Buffer keeps the last 16.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('TEXT: ' + typed.slice(-20), x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
