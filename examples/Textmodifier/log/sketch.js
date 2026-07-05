/**
 * @title Textmodifier.log
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let input = 1;
let output = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(4, 8, 16);
	input = 1 + t.norm(t.sin(t.frameCount * 0.03) + t.cos(t.frameCount * 0.019) * 0.4, -1.4, 1.4) * 24;
	output = t.log(input);

	for (let i = 1; i <= 36; i++) {
		const value = 1 + i * 0.7;
		const y = 8 - t.log(value) * 4;
		const glow = t.norm(value, 1, 26);
		t.push();
		t.translate(-18 + i, y);
		t.char(glow > 0.7 ? '#' : '+');
		t.charColor(90 + glow * 140, 155 + glow * 80, 255);
		t.point();
		t.pop();
	}

	t.char('@');
	t.charColor(255, 215, 100);
	t.push();
	t.translate(t.map(input, 1, 26, -17, 18), 8 - output * 4);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.LOG', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: COMPRESSING GROWTH', x, y++, 100, 220, 255);
	drawText('log(x) rises fast, then settles.', x, y++, 140, 160, 190);
	drawText('Wide inputs fit a gentle curve.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`INPUT: ${input.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`LOG: ${output.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
