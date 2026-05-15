/**
 * @title Textmodifier.arc
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

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;
	const startAngle = (time * 50) % 360;
	const endAngle = startAngle + 90 + Math.sin(time) * 45;

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();

	drawCenteredText('Textmodifier.arc', -12, [240, 245, 255]);
	drawCenteredText('Drawing circular or elliptical paths.', -10, [150, 170, 200]);

	t.push();
	t.char('#');
	t.charColor(140, 180, 255);
	t.lineWeight(1);

	// Params: width, height, startAngle (deg), endAngle (deg)
	t.arc(24, 14, startAngle, endAngle);

	t.push();
	t.charColor(60, 70, 100, 150);
	t.char('.');

	const startRad = (startAngle * Math.PI) / 180;
	t.line(0, 0, Math.cos(startRad) * 12, Math.sin(startRad) * 7);

	const endRad = (endAngle * Math.PI) / 180;
	t.line(0, 0, Math.cos(endRad) * 12, Math.sin(endRad) * 7);
	t.pop();
	t.pop();

	drawCenteredText(`START: ${startAngle.toFixed(1).padStart(5, '0')} DEG`, 8, [255, 225, 140]);
	drawCenteredText(`END:   ${endAngle.toFixed(1).padStart(5, '0')} DEG`, 10, [140, 255, 180]);
	drawCenteredText('t.arc(width, height, start, end)', 13, [100, 120, 150]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
