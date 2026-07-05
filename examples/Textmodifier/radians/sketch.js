/**
 * @title Textmodifier.radians
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let angle = 0;

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
	t.background(7, 9, 18);
	angle = (t.frameCount * 2 + t.mouse.x * 2) % 360;
	const radians = t.radians(angle);

	t.char('.');
	t.charColor(45, 55, 86);
	for (let r = 3; r <= 9; r += 3) t.ellipse(r * 2, r * 2);

	for (let i = 0; i < 10; i++) {
		const a = radians + i * 0.45;
		const radius = 3 + i * 0.65;
		const x = Math.cos(a) * radius;
		const y = Math.sin(a) * radius;
		const fade = t.map(i, 0, 9, 255, 80);
		t.char(i === 0 ? '@' : '+');
		t.charColor(120, fade, 255 - i * 10);
		drawPoint(x, y);
	}

	t.push();
	t.rotate(angle);
	t.char('>');
	t.charColor(255, 220, 120);
	t.line(0, 0, 10, 0);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.RADIANS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DEGREE TO RADIAN', x, y++, 100, 220, 255);
	drawText('radians() feeds sin and cos.', x, y++, 140, 160, 190);
	drawText('The spiral uses circular math.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`ANGLE: ${angle.toFixed(1)} DEG`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
