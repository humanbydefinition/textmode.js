/**
 * @title LayerManager.clear
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let mode = 0;

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

function rebuildLayers() {
	t.layers.clear();
	mode++;

	const labels = ['Layer A', 'Layer B', 'Layer C'];
	const colors = [
		[255, 120, 80],
		[120, 255, 180],
		[80, 180, 255],
	];

	for (let index = 0; index < labels.length; index++) {
		const layer = t.layers.add({
			blendMode: ['screen', 'additive', 'difference'][index],
			opacity: 0.6,
		});

		layer.draw(() => {
			t.clear();
			drawCenteredText(labels[index], (index - 1) * 6, colors[index]);
		});
	}
}

t.setup(() => {
	rebuildLayers();
});

t.draw(() => {
	t.background(6, 10, 22);

	drawCenteredText('Base Layer', -12, [240, 245, 255]);
	drawCenteredText(`Mode: ${(mode % 9) + 1}`, 12, [200, 200, 200]);

	if (t.frameCount % 180 === 0) {
		rebuildLayers();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
