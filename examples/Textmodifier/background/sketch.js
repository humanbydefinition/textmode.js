/**
 * @title Textmodifier.background
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
	const time = t.frameCount * 0.02;

	const r = Math.round(40 + 40 * Math.sin(time));
	const b = Math.round(60 + 40 * Math.cos(time * 0.7));
	t.background(r, 20, b);

	const bg = t.background();

	drawCenteredText('Textmodifier.background', -12, [240, 245, 255]);
	drawCenteredText('Setting and retrieving the canvas background color.', -10, [150, 170, 200]);

	t.push();
	t.charColor(255, 225, 140);
	t.char('#');
	t.rect(14, 6);
	t.pop();

	drawCenteredText('RGB GETTER READOUT', 8, [140, 255, 180]);
	drawCenteredText(
		`R: ${bg.r.toString().padStart(3, '0')}  G: ${bg.g.toString().padStart(3, '0')}  B: ${bg.b.toString().padStart(3, '0')}`,
		10,
		[140, 180, 255]
	);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
