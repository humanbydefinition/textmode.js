/**
 * @title Textmodifier.lerp
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let blend = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function drawPoint(x, y) {
	t.push();
	t.translate(x, y);
	t.point();
	t.pop();
}

t.draw(() => {
	t.background(9, 10, 18);
	blend = (Math.sin(t.frameCount * 0.035) + 1) * 0.5;
	const left = -16;
	const right = 16;

	t.char('-');
	t.charColor(55, 75, 115);
	t.line(left, 0, right, 0);

	for (let i = 0; i <= 12; i++) {
		const local = i / 12;
		const x = t.lerp(left, right, local);
		const y = Math.sin(local * Math.PI * 2 + t.frameCount * 0.04) * 5;
		const r = Math.round(t.lerp(90, 255, local));
		const b = Math.round(t.lerp(255, 80, local));
		t.char(i % 2 === 0 ? '+' : '.');
		t.charColor(r, 160, b);
		drawPoint(x, y);
	}

	const x = t.lerp(left, right, blend);
	const y = t.lerp(-7, 7, blend);
	const size = Math.round(t.lerp(1, 4, blend));
	t.char('#');
	t.charColor(t.lerp(90, 255, blend), 230, t.lerp(255, 90, blend));
	t.rect(size, size);

	t.push();
	t.translate(x, y);
	t.char('@');
	t.charColor(120, 255, 190);
	t.rect(size + 1, size + 1);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.LERP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: INTERPOLATION', x, y++, 100, 220, 255);
	drawText('lerp(a,b,t) blends between values.', x, y++, 140, 160, 190);
	drawText('Position, color, and size all blend.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`T: ${blend.toFixed(2)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
