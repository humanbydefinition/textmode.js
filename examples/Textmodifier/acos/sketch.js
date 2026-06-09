/**
 * @title Textmodifier.acos
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let input = 0;
let angle = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(8, 7, 16);
	input = t.constrain(t.cos(t.frameCount * 0.035) + t.sin(t.frameCount * 0.019) * 0.25, -1, 1);
	angle = t.acos(input);
	const radius = 15;
	const x = t.round(input * radius);
	const y = t.round(t.sin(angle) * radius);

	t.char('.');
	t.charColor(45, 65, 100);
	for (let i = 0; i <= 36; i++) {
		const a = t.radians(i * 5);
		t.push();
		t.translate(t.round(t.cos(a) * radius), t.round(t.sin(a) * radius));
		t.point();
		t.pop();
	}

	t.char('|');
	t.charColor(95, 145, 210);
	t.line(x, 0, x, y);
	t.char('*');
	t.charColor(255, 205, 100);
	t.line(0, 0, x, y);
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ACOS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: X VALUE TO ANGLE', x, y++, 100, 220, 255);
	drawText('acos(value) reverses cosine.', x, y++, 140, 160, 190);
	drawText('The vertical chord reveals arc.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`VALUE: ${input.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`ANGLE: ${angle.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
