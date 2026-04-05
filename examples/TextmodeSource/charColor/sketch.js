/**
 * @title TextmodeSource.charColor
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
	gradient.addColorStop(0, '#000000');
	gradient.addColorStop(1, '#ffffff');
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
	source.cellColorMode('fixed');
	source.cellColor(0);
});

t.draw(() => {
	t.background(0);
	if (!source) return;

	const red = 150 + 100 * Math.sin(t.frameCount * 0.05);
	const blue = 150 + 100 * Math.cos(t.frameCount * 0.05);

	source.charColor(red, 100, blue);
	t.image(source, source.width, source.height);
	drawLabel('charColor(r, 100, b)', Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
