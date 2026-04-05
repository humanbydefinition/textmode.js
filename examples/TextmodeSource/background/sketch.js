/**
 * @title TextmodeSource.background
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let plainSource;
let backgroundSource;

function createTransparentCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 160;
	canvas.height = 160;

	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#ffffff';
	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, 48, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = '#000000';
	ctx.fillRect(canvas.width / 2 - 10, canvas.height / 2 - 10, 20, 20);

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
	const canvas = createTransparentCanvas();

	plainSource = t.createTexture(canvas);
	plainSource.characters(' .:-=+*#%@');

	backgroundSource = t.createTexture(canvas);
	backgroundSource.characters(' .:-=+*#%@');
	backgroundSource.background(255, 0, 0);
});

t.draw(() => {
	t.background(40);
	if (!plainSource || !backgroundSource) return;

	const size = Math.min(plainSource.width, plainSource.height) * 0.7;
	const offset = Math.floor(size * 0.7);

	t.push();
	t.translate(-offset, 0);
	t.image(plainSource, size, size);
	t.pop();

	t.push();
	t.translate(offset, 0);
	t.image(backgroundSource, size, size);
	t.pop();

	drawLabel('default transparent fallback', -offset, Math.floor(t.grid.rows / 2) - 2);
	drawLabel('background(255, 0, 0)', offset, Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
