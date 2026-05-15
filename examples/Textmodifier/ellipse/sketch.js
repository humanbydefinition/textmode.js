/**
 * @title Textmodifier.ellipse
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawCenteredText(text, row, rgb = [240, 245, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), row);
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

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.secs;

	const rx = 20 + Math.sin(time * 1.5) * 10;
	const ry = 12 + Math.cos(time * 2.0) * 8;

	t.push();
	t.charColor(100, 200, 255);
	t.char('•');
	t.ellipse(rx, ry);

	t.push();
	t.charColor(255, 100, 100);
	t.char('-');
	t.line(0, 0, rx, 0);
	t.translate(rx, 0);
	t.char('>');
	t.point();
	t.pop();

	t.push();
	t.charColor(100, 255, 100);
	t.char('|');
	t.line(0, 0, 0, ry);
	t.translate(0, ry);
	t.char('v');
	t.point();
	t.pop();
	t.pop();

	drawCenteredText('Textmodifier.ellipse', -22, [255, 255, 255]);
	drawCenteredText('Draws a 2D ellipse with two radii.', -20, [150, 170, 200]);
	drawCenteredText('radiusX for width, radiusY for height.', -18, [150, 170, 200]);
	drawCenteredText(`t.ellipse(radiusX: ${rx.toFixed(1)}, radiusY: ${ry.toFixed(1)})`, 18, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
