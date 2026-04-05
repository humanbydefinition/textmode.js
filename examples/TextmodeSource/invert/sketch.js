/**
 * @title TextmodeSource.invert
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let normalSource;
let invertedSource;

function createGradientCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 160;
	canvas.height = 160;

	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	gradient.addColorStop(0, '#050505');
	gradient.addColorStop(1, '#f5f5f5');
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

	normalSource = t.createTexture(canvas);
	normalSource.characters(' .:-=+*#%@');

	invertedSource = t.createTexture(canvas);
	invertedSource.characters(' .:-=+*#%@');
	invertedSource.invert(true);
});

t.draw(() => {
	t.background(0);
	if (!normalSource || !invertedSource) return;

	const size = Math.min(normalSource.width, normalSource.height) * 0.7;
	const offset = Math.floor(size * 0.7);

	t.push();
	t.translate(-offset, 0);
	t.image(normalSource, size, size);
	t.pop();

	t.push();
	t.translate(offset, 0);
	t.image(invertedSource, size, size);
	t.pop();

	drawLabel('invert(false)', -offset, Math.floor(t.grid.rows / 2) - 2);
	drawLabel('invert(true)', offset, Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
