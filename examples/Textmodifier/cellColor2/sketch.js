/**
 * @title Textmodifier.cellColor2
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

	drawCenteredText('Textmodifier.cellColor (Grayscale)', -12, [240, 245, 255]);
	drawCenteredText('Passing a single number sets an R=G=B cell background.', -10, [150, 170, 200]);

	drawCenteredText('t.cellColor(gray)', 12, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.05;
	const gray = Math.round(127 + 127 * Math.sin(time));

	t.cellColor(gray);

	t.push();
	t.charColor(255 - gray);
	t.char('+');
	t.rect(20, 10);
	t.pop();

	t.push();
	t.resetCamera();
	drawCenteredText('GRAYSCALE PULSE', 8, [255, 225, 140]);
	drawCenteredText(`VALUE: ${gray.toString().padStart(3, '0')}`, 10, [140, 180, 255]);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
