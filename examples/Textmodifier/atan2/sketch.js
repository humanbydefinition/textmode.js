/**
 * @title Textmodifier.atan2
 */
const t = textmode.create({
	pixelDensity: 1,
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

t.draw(() => {
	t.background(4, 7, 16);
	const targetX = t.sin(t.frameCount * 0.027) * 18 + t.cos(t.frameCount * 0.05) * 4;
	const targetY = t.cos(t.frameCount * 0.039) * 8 + t.sin(t.frameCount * 0.043) * 3;
	angle = t.atan2(targetY, targetX);

	t.char('.');
	t.charColor(45, 60, 95);
	for (let i = 0; i < 40; i++) {
		const a = (i / 40) * t.radians(360);
		t.push();
		t.translate(t.round(t.cos(a) * 16), t.round(t.sin(a) * 8));
		t.point();
		t.pop();
	}

	t.char('*');
	t.charColor(255, 215, 100);
	t.line(0, 0, t.round(t.cos(angle) * 22), t.round(t.sin(angle) * 11));
	t.char('@');
	t.charColor(120, 255, 170);
	t.push();
	t.translate(t.round(targetX), t.round(targetY));
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ATAN2', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: POINTING AT A TARGET', x, y++, 100, 220, 255);
	drawText('atan2(y, x) keeps quadrants.', x, y++, 140, 160, 190);
	drawText('The ray tracks the green target.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`ANGLE: ${angle.toFixed(2)} rad`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
