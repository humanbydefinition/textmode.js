/**
 * @title Textmodifier.color
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.cellColor(0, 0, 0, 0);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

labelLayer.draw(() => {
	t.clear();

	drawCenteredText('Textmodifier.color (Grayscale)', -12, [240, 245, 255]);
	drawCenteredText('Creating reusable colors from gray and alpha levels.', -10, [150, 170, 200]);

	drawCenteredText('t.color(gray, alpha)', 12, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.04;

	const count = 5;
	for (let i = 0; i < count; i++) {
		const phase = i / count;
		const brightness = 100 + 155 * Math.sin(time + phase);
		const alpha = 100 + 155 * Math.cos(time + phase);

		const col = t.color(brightness, alpha);

		t.push();
		t.translate((i - 2) * 8, 0);
		t.charColor(col);
		t.char('#');
		t.rect(6, 6);
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
