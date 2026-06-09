/**
 * @title Textmodifier.atan
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let slope = 0;
let angle = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(5, 8, 18);
	slope = t.sin(t.frameCount * 0.035) * 3 + t.cos(t.frameCount * 0.021) * 1.2;
	angle = t.atan(slope);

	for (let i = -4; i <= 4; i++) {
		const s = i * 0.6;
		const a = t.atan(s);
		t.char('.');
		t.charColor(45, 65, 100);
		t.line(0, 0, t.round(t.cos(a) * 18), t.round(t.sin(a) * 18));
	}

	t.char('*');
	t.charColor(255, 215, 100);
	t.line(0, 0, t.round(t.cos(angle) * 20), t.round(t.sin(angle) * 20));
	t.char('@');
	t.push();
	t.translate(t.round(t.cos(angle) * 20), t.round(t.sin(angle) * 20));
	t.charColor(120, 255, 170);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ATAN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SLOPE TO ANGLE', x, y++, 100, 220, 255);
	drawText('atan(slope) compresses extremes.', x, y++, 140, 160, 190);
	drawText('Steep values still fit a ray.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SLOPE: ${slope.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`ANGLE: ${angle.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
