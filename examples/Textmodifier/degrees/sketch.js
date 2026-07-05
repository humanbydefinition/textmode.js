/**
 * @title Textmodifier.degrees
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let angleDeg = 0;

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
	t.background(6, 12, 18);
	const targetX = t.mouse.x || Math.cos(t.frameCount * 0.025) * 10;
	const targetY = t.mouse.y || Math.sin(t.frameCount * 0.025) * 6;
	const radians = Math.atan2(targetY, targetX);
	angleDeg = t.degrees(radians);

	t.char('.');
	t.charColor(42, 58, 86);
	t.ellipse(14, 14);
	t.line(-10, 0, 10, 0);
	t.line(0, -6, 0, 6);

	t.char('+');
	t.charColor(90, 170, 230);
	for (let i = 0; i < 12; i++) {
		const a = (i / 12) * Math.PI * 2;
		drawPoint(Math.cos(a) * 7, Math.sin(a) * 7);
	}

	t.push();
	t.rotate(angleDeg);
	t.char('>');
	t.charColor(255, 210, 110);
	t.line(0, 0, 8, 0);
	t.translate(9, 0);
	t.point();
	t.pop();

	t.char('o');
	t.charColor(120, 255, 180);
	drawPoint(targetX, targetY);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.DEGREES', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RADIAN TO DEGREE', x, y++, 100, 220, 255);
	drawText('atan2() gives radians.', x, y++, 140, 160, 190);
	drawText('degrees() feeds rotate().', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`ANGLE: ${angleDeg.toFixed(1)} DEG`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
