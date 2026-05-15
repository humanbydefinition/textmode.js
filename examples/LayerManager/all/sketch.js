/**
 * @title LayerManager.all
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

labels.forEach((label, index) => {
	const layer = t.layers.add({ blendMode: 'screen', opacity: 0.7 });

	layer.draw(() => {
		t.clear();
		drawCenteredText(label, 0, colors[index]);
	});
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;

	t.layers.all.forEach((layer, index) => {
		const angle = time + index * ((Math.PI * 2) / t.layers.all.length);
		const radius = 5;

		layer.offset(Math.cos(angle) * radius, Math.sin(angle) * radius);
		layer.opacity(0.4 + 0.4 * Math.sin(time * 2 + index));
	});
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
