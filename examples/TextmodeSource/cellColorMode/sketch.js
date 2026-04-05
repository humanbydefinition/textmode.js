/**
 * @title TextmodeSource.cellColorMode
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let sampledSource;
let fixedSource;

function createColorCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 160;
	canvas.height = 160;

	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	gradient.addColorStop(0, '#00c2ff');
	gradient.addColorStop(0.5, '#00ff88');
	gradient.addColorStop(1, '#ffee00');
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
	const canvas = createColorCanvas();

	sampledSource = t.createTexture(canvas);
	sampledSource.characters(' .:-=+*#%@');
	sampledSource.charColorMode('sampled');
	sampledSource.cellColorMode('sampled');

	fixedSource = t.createTexture(canvas);
	fixedSource.characters(' .:-=+*#%@');
	fixedSource.charColorMode('sampled');
	fixedSource.cellColorMode('fixed');
	fixedSource.cellColor('#120022');
});

t.draw(() => {
	t.background(0);
	if (!sampledSource || !fixedSource) return;

	const pulse = 64 + Math.round(64 * (1 + Math.sin(t.frameCount * 0.05)));
	fixedSource.cellColor(pulse, 0, 40);

	const size = Math.min(sampledSource.width, sampledSource.height) * 0.7;
	const offset = Math.floor(size * 0.7);

	t.push();
	t.translate(-offset, 0);
	t.image(sampledSource, size, size);
	t.pop();

	t.push();
	t.translate(offset, 0);
	t.image(fixedSource, size, size);
	t.pop();

	drawLabel("cellColorMode('sampled')", -offset, Math.floor(t.grid.rows / 2) - 2);
	drawLabel("cellColorMode('fixed')", offset, Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
