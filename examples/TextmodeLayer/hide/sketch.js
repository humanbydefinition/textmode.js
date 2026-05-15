/**
 * @title TextmodeLayer.hide
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const signalLayer = t.layers.add({ blendMode: 'additive' });

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
		if (signalLayer._visible) {
			signalLayer.hide();
		} else {
			signalLayer.show();
		}
	}

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();

	drawCenteredText('TextmodeLayer.hide', -10, [240, 245, 255]);
	drawCenteredText('Hiding a layer stops it from being composited.', -8, [150, 170, 200]);

	const isVisible = signalLayer._visible;
	const statusColor = isVisible ? [140, 255, 180] : [255, 100, 100];

	drawCenteredText(isVisible ? 'LAYER: VISIBLE' : 'LAYER: HIDDEN', 6, statusColor);
	drawCenteredText('The draw() callback still runs, but output is hidden.', 9, [100, 120, 150]);
});

signalLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.05;

	t.push();
	t.charColor(140, 180, 255);
	t.char('#');
	const size = 6 + Math.sin(time) * 2;
	t.rect(Math.round(size * 1.5), Math.round(size));
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
