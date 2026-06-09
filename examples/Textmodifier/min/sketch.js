/**
 * @title Textmodifier.min
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let low = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(4, 8, 17);
	const values = [];
	for (let i = 0; i < 15; i++) {
		values.push(t.round(t.sin(t.frameCount * 0.035 + i * 0.7) * 7 + t.cos(i) * 3));
	}
	low = t.min(values);

	for (let i = 0; i < values.length; i++) {
		const x = -21 + i * 3;
		const isLow = values[i] === low;
		t.push();
		t.translate(x, 6 - values[i] / 2);
		t.char(isLow ? '@' : '#');
		t.charColor(isLow ? 255 : 80, isLow ? 215 : 140, isLow ? 110 : 230);
		t.rect(1, t.abs(values[i]) + 1);
		t.pop();
	}

	t.char('-');
	t.charColor(255, 160, 110);
	t.line(-23, 6 - low, 23, 6 - low);
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MIN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LOWER ENVELOPE', x, y++, 100, 220, 255);
	drawText('min(array) finds the lowest bar.', x, y++, 140, 160, 190);
	drawText('The orange line follows it.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MIN: ${low}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
