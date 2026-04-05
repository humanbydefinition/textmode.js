/**
 * @title TextmodeSource.conversionMode
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let source;

function createGradientCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 160;
	canvas.height = 160;

	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	gradient.addColorStop(0, '#040404');
	gradient.addColorStop(0.5, '#888888');
	gradient.addColorStop(1, '#f8f8f8');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	return canvas;
}

function drawLabel(text, y) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
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
	source = t.createTexture(createGradientCanvas());
	source.conversionMode('brightness');
	source.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(0);
	if (!source) return;

	t.image(source, source.width, source.height);
	drawLabel("conversionMode('brightness')", Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
