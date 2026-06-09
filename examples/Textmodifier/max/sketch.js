/**
 * @title Textmodifier.max
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let high = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 6, 17);
	const values = [];
	for (let i = 0; i < 15; i++) {
		values.push(t.round(t.cos(t.frameCount * 0.032 + i * 0.62) * 7 + t.sin(i * 0.8) * 3));
	}
	high = t.max(values);

	for (let i = 0; i < values.length; i++) {
		const x = -21 + i * 3;
		const isHigh = values[i] === high;
		t.push();
		t.translate(x, 6 - values[i] / 2);
		t.char(isHigh ? '@' : '#');
		t.charColor(isHigh ? 120 : 80, isHigh ? 255 : 140, isHigh ? 170 : 230);
		t.rect(1, t.abs(values[i]) + 1);
		t.pop();
	}

	t.char('-');
	t.charColor(120, 245, 180);
	t.line(-23, 6 - high, 23, 6 - high);
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MAX', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: UPPER ENVELOPE', x, y++, 100, 220, 255);
	drawText('max(values...) finds the peak.', x, y++, 140, 160, 190);
	drawText('The green line rides the crest.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MAX: ${high}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
