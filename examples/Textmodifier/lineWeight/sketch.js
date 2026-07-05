/**
 * @title Textmodifier.lineWeight
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let weight = 1;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	weight = 1 + Math.floor((t.frameCount / 60) % 4);
	t.charColor(70, 80, 110);
	t.char('.');
	t.line(-20, -6, 20, -6);
	t.line(-20, 6, 20, 6);
	t.lineWeight(weight);
	t.charColor(120, 255, 180);
	t.char('#');
	t.line(-20, 0, 20, 0);
	t.lineWeight(1);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.LINEWEIGHT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LINE THICKNESS', x, y++, 100, 220, 255);
	drawText('Controls line cell thickness.', x, y++, 140, 160, 190);
	drawText('Weight resets after the demo line.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`WEIGHT: ${weight}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
