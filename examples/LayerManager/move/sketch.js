/**
 * @title LayerManager.move
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labels = ['Layer 1', 'Layer 2', 'Layer 3'];
const colors = [
	[255, 120, 80],
	[120, 255, 180],
	[80, 180, 255],
];

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

const layers = labels.map((label, index) => {
	const layer = t.layers.add();

	layer.draw(() => {
		t.clear();
		drawCenteredText(label, 0, colors[index]);
	});

	return layer;
});

t.draw(() => {
	t.background(6, 10, 22);

	drawCenteredText('Base Layer', -8, [240, 245, 255]);

	if (t.frameCount % 75 === 0) {
		const step = Math.floor(t.frameCount / 75);
		const layer = layers[step % layers.length];
		t.layers.move(layer, layers.length - 1);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
