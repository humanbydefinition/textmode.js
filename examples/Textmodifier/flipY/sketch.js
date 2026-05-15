/**
 * @title Textmodifier.flipY
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

	const count = 30;
	const time = t.frameCount * 0.04;

	for (let i = 0; i < count; i++) {
		const x = (i / (count - 1) - 0.5) * t.grid.cols * 0.75;
		const wave = Math.sin(time * 1.5 + i * 0.35) * 2.5;
		const glow = 0.5 + 0.5 * Math.sin(time + i * 0.15);
		const skyY = -7 + wave;
		const waterY = 7 + wave;

		t.push();
		t.translate(x, skyY);
		t.charColor(Math.round(160 + 95 * glow), Math.round(160 + 95 * glow), 255);
		t.char('^');
		t.point();
		t.pop();

		t.push();
		t.translate(x, waterY);
		t.flipY(true);
		t.charColor(Math.round(30 + 40 * glow), Math.round(80 + 60 * glow), Math.round(150 + 105 * glow));
		t.char('^');
		t.point();
		t.pop();
	}

	drawCenteredText('Textmodifier.flipY', -4, [240, 245, 255]);
	drawCenteredText('Reflecting glyphs vertically.', -2, [150, 170, 200]);
	drawCenteredText('t.flipY(false)  original  |  t.flipY(true)  reflected', 0, [255, 200, 100]);

	drawCenteredText(`t.flipY() = ${t.flipY()}`, 12, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
