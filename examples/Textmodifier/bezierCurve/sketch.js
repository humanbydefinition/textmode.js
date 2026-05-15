/**
 * @title Textmodifier.bezierCurve
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

function drawPoint(x, y, char, rgb, label) {
	t.push();
	t.translate(x, y);
	t.char(char);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.point();

	t.push();
	t.translate(1, 1);
	t.charColor(rgb[0], rgb[1], rgb[2], 150);
	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(label[i]);
		t.point();
		t.pop();
	}
	t.pop();
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;

	const x1 = -15,
		y1 = 0;
	const x2 = 15,
		y2 = 0;

	const cp1x = -10 + Math.cos(time) * 5;
	const cp1y = -8 + Math.sin(time) * 4;

	const cp2x = 10 + Math.sin(time * 0.7) * 5;
	const cp2y = 8 + Math.cos(time * 0.8) * 4;

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();

	drawCenteredText('Textmodifier.bezierCurve', -12, [240, 245, 255]);
	drawCenteredText('Drawing smooth paths using four control points.', -10, [150, 170, 200]);

	t.push();
	t.charColor(60, 70, 100, 120);
	t.char('.');
	t.line(x1, y1, cp1x, cp1y);
	t.line(x2, y2, cp2x, cp2y);
	t.pop();

	t.push();
	t.char('#');
	t.charColor(140, 180, 255);
	t.lineWeight(1);
	t.bezierCurve(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2);
	t.pop();

	drawPoint(x1, y1, 'o', [140, 255, 180], 'START');
	drawPoint(x2, y2, 'o', [255, 140, 180], 'END');
	drawPoint(cp1x, cp1y, '+', [255, 225, 140], 'CP1');
	drawPoint(cp2x, cp2y, '+', [255, 225, 140], 'CP2');

	drawCenteredText('CUBIC BEZIER SCHEMATIC', 10, [140, 220, 255]);
	drawCenteredText('t.bezierCurve(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2)', 13, [100, 120, 150]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
