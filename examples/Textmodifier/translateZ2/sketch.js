/**
 * @title Textmodifier.translateZ2
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

	const time = t.frameCount * 0.05;
	const zOsc = Math.sin(time) * 30;

	t.push();
	t.charColor(30, 40, 60);
	t.char('.');
	t.rect(40, 20);
	t.pop();

	t.push();
	t.translateZ(0); // Standard depth
	t.charColor(100, 120, 150);
	t.char('O');
	t.rect(15, 15);
	t.pop();

	t.push();
	// Move the core back and forth through the ring
	t.translateZ(zOsc);

	const currentZ = t.translateZ();
	const isAhead = currentZ > 0;

	if (isAhead) {
		t.charColor(255, 200, 100);
		t.char('☼');
	} else {
		t.charColor(100, 150, 255);
		t.char('•');
	}

	t.rect(6, 6);

	t.push();
	t.translate(0, 5);
	const zLabel = `Z: ${currentZ.toFixed(1)}`;
	t.translate(-Math.floor(zLabel.length / 2), 0);
	t.charColor(255);
	for (let i = 0; i < zLabel.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(zLabel[i]);
		t.point();
		t.pop();
	}
	t.pop();
	t.pop();

	drawCenteredText('Textmodifier.translateZ (Depth Interaction)', -12, [255, 255, 255]);
	drawCenteredText('Objects with higher Z values are rendered in front.', -10, [150, 170, 200]);
	drawCenteredText(
		isAhead ? 'Core is IN FRONT of Ring' : 'Core is BEHIND Ring',
		12,
		isAhead ? [255, 200, 100] : [100, 150, 255]
	);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
