/**
 * @title TextmodeSource.charRotation
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let source;

function createCheckerCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 160;
	canvas.height = 160;

	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
	ctx.fillRect(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);

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
	source = t.createTexture(createCheckerCanvas());
	source.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(0);
	if (!source) return;

	const size = Math.min(source.width, source.height) * 0.7;
	const offset = Math.floor(size * 0.7);

	source.charRotation(0);
	t.push();
	t.translate(-offset, 0);
	t.image(source, size, size);
	t.pop();

	source.charRotation(90);
	t.push();
	t.translate(offset, 0);
	t.image(source, size, size);
	t.pop();

	drawLabel('charRotation(0)', -offset, Math.floor(t.grid.rows / 2) - 2);
	drawLabel('charRotation(90)', offset, Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
