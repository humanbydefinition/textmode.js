/**
 * @title Textmodifier.asin
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
	t.background(4, 10, 18);
	input = t.constrain(t.sin(t.frameCount * 0.04) + t.cos(t.frameCount * 0.017) * 0.25, -1, 1);
	angle = t.asin(input);
	const radius = 14;

	for (let i = -16; i <= 16; i++) {
		const a = t.radians(i * 6);
		t.push();
		t.translate(t.round(t.cos(a) * radius), t.round(t.sin(a) * radius));
		t.char('.');
		t.charColor(50, 70, 105);
		t.point();
		t.pop();
	}

	t.char('-');
	t.charColor(80, 130, 180);
	t.line(-radius, t.round(input * radius), radius, t.round(input * radius));
	t.char('*');
	t.charColor(255, 210, 100);
	t.line(0, 0, t.round(t.cos(angle) * radius), t.round(t.sin(angle) * radius));
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ASIN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: VALUE BACK TO ANGLE', x, y++, 100, 220, 255);
	drawText('asin(value) reverses sine.', x, y++, 140, 160, 190);
	drawText('The horizontal value finds a ray.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`VALUE: ${input.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`ANGLE: ${angle.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
