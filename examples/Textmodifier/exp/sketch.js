/**
 * @title Textmodifier.exp
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let input = 0;
let output = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(8, 5, 15);
	input = t.norm(t.sin(t.frameCount * 0.028) + t.cos(t.frameCount * 0.018) * 0.45, -1.45, 1.45) * 3 - 1.5;
	output = t.exp(input);

	for (let i = 0; i <= 36; i++) {
		const xValue = t.map(i, 0, 36, -1.5, 1.5);
		const y = 8 - t.exp(xValue) * 2.2;
		const heat = t.norm(xValue, -1.5, 1.5);
		t.push();
		t.translate(-18 + i, y);
		t.char(heat > 0.7 ? '#' : '+');
		t.charColor(100 + heat * 140, 120 + heat * 90, 230);
		t.point();
		t.pop();
	}

	t.char('@');
	t.charColor(255, 215, 100);
	t.push();
	t.translate(t.map(input, -1.5, 1.5, -18, 18), 8 - output * 2.2);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.EXP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ACCELERATING GROWTH', x, y++, 100, 220, 255);
	drawText('exp(x) starts quiet, then blooms.', x, y++, 140, 160, 190);
	drawText('The right side lifts rapidly.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`INPUT: ${input.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`EXP: ${output.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
