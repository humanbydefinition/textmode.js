/**
 * @title TextmodeSource.flipY
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let source;

function createArrowCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 160;
	canvas.height = 160;

	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	ctx.fillStyle = '#101010';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#ffffff';
	ctx.beginPath();
	ctx.moveTo(80, 24);
	ctx.lineTo(132, 104);
	ctx.lineTo(100, 104);
	ctx.lineTo(100, 136);
	ctx.lineTo(60, 136);
	ctx.lineTo(60, 104);
	ctx.lineTo(28, 104);
	ctx.closePath();
	ctx.fill();

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
	source = t.createTexture(createArrowCanvas());
	source.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(0);
	if (!source) return;

	const size = Math.min(source.width, source.height) * 0.7;
	const offset = Math.floor(size * 0.7);

	source.flipY(false);
	t.push();
	t.translate(-offset, 0);
	t.image(source, size, size);
	t.pop();

	source.flipY(true);
	t.push();
	t.translate(offset, 0);
	t.image(source, size, size);
	t.pop();

	drawLabel('flipY(false)', -offset, Math.floor(t.grid.rows / 2) - 2);
	drawLabel('flipY(true)', offset, Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
