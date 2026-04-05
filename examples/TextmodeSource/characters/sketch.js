/**
 * @title TextmodeSource.characters
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let sparseSource;
let denseSource;

function createGradientCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 160;
	canvas.height = 160;

	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	gradient.addColorStop(0, '#000000');
	gradient.addColorStop(1, '#ffffff');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	return canvas;
}

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

t.setup(() => {
	const canvas = createGradientCanvas();

	sparseSource = t.createTexture(canvas);
	sparseSource.characters(' .oO@');

	denseSource = t.createTexture(canvas);
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
