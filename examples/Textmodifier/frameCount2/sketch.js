/**
 * @title Textmodifier.frameCount2
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

t.keyPressed((data) => {
	if (data.key === ' ') {
		t.frameCount = 0;
	}
});

t.draw(() => {
	t.background(6, 10, 22);

	const angle = t.frameCount * 0.08;

	for (let i = 0; i < 3; i++) {
		const phase = angle + (i / 3) * Math.PI * 2;
		const x = Math.round(Math.cos(phase) * 14);
		const y = Math.round(Math.sin(phase) * 7);
		const chars = ['@', '#', '*'];
		const colors = [
			[255, 180, 80],
			[100, 200, 255],
			[255, 100, 150],
		];
		const cellColors = [
			[60, 40, 20],
			[20, 40, 60],
			[60, 20, 40],
		];

		t.push();
		t.translate(x, y);
		t.charColor(colors[i][0], colors[i][1], colors[i][2]);
		t.cellColor(cellColors[i][0], cellColors[i][1], cellColors[i][2]);
		t.char(chars[i]);
		t.rect(4, 4);
		t.pop();
	}

	drawCenteredText('Textmodifier.frameCount2', -12, [240, 245, 255]);
	drawCenteredText('Writable counter — reset to replay animation.', -10, [150, 170, 200]);

	drawCenteredText(`t.frameCount = ${t.frameCount}`, -7, [140, 180, 255]);

	drawCenteredText('press SPACE to reset  ->  t.frameCount = 0', 12, [80, 90, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
