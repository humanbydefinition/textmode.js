/**
 * @title TextmodeSource.characters
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let sparseSource;
let denseSource;

function drawLabel(text, x, y) {
	t.push();
	t.translate(x - Math.floor(text.length / 2), y);
	t.charColor(255);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.setup(async () => {
	sparseSource = await t.loadImage(IMAGE_URL);
	sparseSource.characters(' .oO@');

	denseSource = await t.loadImage(IMAGE_URL);
	denseSource.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(0);
	if (!sparseSource || !denseSource) return;

	const size = Math.min(sparseSource.width, sparseSource.height) * 0.7;
	const offset = Math.floor(size * 0.7);

	t.push();
	t.translate(-offset, 0);
	t.image(sparseSource, size, size);
	t.pop();

	t.push();
	t.translate(offset, 0);
	t.image(denseSource, size, size);
	t.pop();

	drawLabel("characters(' .oO@')", -offset, Math.floor(t.grid.rows / 2) - 2);
	drawLabel("characters(' .:-=+*#%@')", offset, Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
