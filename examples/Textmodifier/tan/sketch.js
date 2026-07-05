/**
 * @title Textmodifier.tan
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let angle = 0;
let tangent = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(8, 5, 17);
	angle = t.sin(t.frameCount * 0.025) * t.radians(75);
	tangent = t.tan(angle);
	const slope = t.constrain(tangent, -5, 5);

	t.char('|');
	t.charColor(70, 80, 125);
	t.line(-18, -10, -18, 10);
	t.line(18, -10, 18, 10);

	for (let x = -18; x <= 18; x++) {
		const y = t.round(t.constrain(t.tan(x * 0.08 + angle), -10, 10));
		const heat = t.norm(t.abs(y), 0, 10);
		t.push();
		t.translate(x, y);
		t.char(heat > 0.75 ? '#' : heat > 0.4 ? '+' : '.');
		t.charColor(90 + heat * 160, 120, 255 - heat * 80);
		t.point();
		t.pop();
	}

	t.char('*');
	t.charColor(255, 215, 100);
	t.line(-6, t.round(-slope * 3), 6, t.round(slope * 3));
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.TAN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SLOPE AND ASYMPTOTES', x, y++, 100, 220, 255);
	drawText('tan(angle) grows steep fast.', x, y++, 140, 160, 190);
	drawText('Rails show the unstable edges.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`TAN: ${tangent.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
