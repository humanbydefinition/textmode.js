/**
 * @title Textmodifier.sq
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let input = 0;
let squared = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(5, 8, 18);
	input = t.sin(t.frameCount * 0.035) * 8 + t.cos(t.frameCount * 0.02) * 2;
	squared = t.sq(input);

	for (let x = -12; x <= 12; x++) {
		const y = t.round(t.sq(x / 4) - 8);
		const hot = t.norm(t.abs(x), 0, 12);
		t.push();
		t.translate(x * 2, y);
		t.char(hot > 0.7 ? '#' : '+');
		t.charColor(80 + hot * 160, 150, 255 - hot * 90);
		t.point();
		t.pop();
	}

	t.char('@');
	t.charColor(255, 220, 100);
	t.push();
	t.translate(t.round(input * 2), t.round(squared / 8 - 8));
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.SQ', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PARABOLIC GROWTH', x, y++, 100, 220, 255);
	drawText('sq(x) multiplies x by itself.', x, y++, 140, 160, 190);
	drawText('Negative and positive both rise.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`X: ${input.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`SQ: ${squared.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
