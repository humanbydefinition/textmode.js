/**
 * @title TextmodeLayer.show
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const displayLayer = t.layers.add({ visible: false, blendMode: 'additive' });

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

	if (t.frameCount % 120 === 0) {
		if (displayLayer._visible) {
			displayLayer.hide();
		} else {
			displayLayer.show();
		}
	}

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();

	drawCenteredText('TextmodeLayer.show', -10, [240, 245, 255]);
	drawCenteredText('Revealing a hidden layer for compositing.', -8, [150, 170, 200]);

	const isVisible = displayLayer._visible;
	const statusColor = isVisible ? [140, 255, 180] : [255, 100, 100];

	drawCenteredText(isVisible ? 'LAYER: VISIBLE' : 'LAYER: HIDDEN', 6, statusColor);
	drawCenteredText('The show() method restores a layer to the stack.', 9, [100, 120, 150]);
});

displayLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.03;

	t.push();
	t.charColor(255, 180, 100);
	t.char('#');
	t.rotateZ((time * 180) / Math.PI);
	t.rect(12, 12);
	t.pop();

	t.push();
	t.charColor(255, 225, 140);
	t.char('+');
	t.point();
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
