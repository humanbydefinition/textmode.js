/**
 * @title Textmodifier.touches
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let points = [];

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	points = Array.from(t.touches);
	if (points.length === 0 && t.mouseIsPressed) points = [t.mouse];
	for (let i = 0; i < points.length; i++) {
		const p = points[i];
		t.push();
		t.translate(p.x, p.y);
		t.char(String(i));
		t.charColor(255, 210, 120);
		t.point();
		t.pop();
		if (i > 0) {
			t.charColor(80, 120, 180);
			t.line(points[i - 1].x, points[i - 1].y, p.x, p.y);
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.TOUCHES', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ACTIVE TOUCH LIST', x, y++, 100, 220, 255);
	drawText('Shows live touch points.', x, y++, 140, 160, 190);
	drawText('Mouse drag acts as fallback.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`TOUCHES: ${points.length}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
