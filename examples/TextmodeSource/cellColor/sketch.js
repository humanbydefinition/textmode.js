/**
 * @title TextmodeSource.cellColor
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
	gradient.addColorStop(0, '#050505');
	gradient.addColorStop(1, '#f5f5f5');
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
	source.characters(' .:-=+*#%@');
	source.charColorMode('fixed');
	source.charColor(255);
	source.cellColorMode('fixed');
});

t.draw(() => {
	t.background(0);
	if (!source) return;

	const blue = 32 + Math.round(64 * (1 + Math.sin(t.frameCount * 0.05)));
	source.cellColor('#000033');
	source.cellColor(0, 0, blue);
	t.image(source, source.width, source.height);
	drawLabel('cellColor(0, 0, blue)', Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
