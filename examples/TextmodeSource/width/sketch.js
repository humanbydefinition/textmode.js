/**
 * @title TextmodeSource.width
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let source;

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

function createSourceCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 128;
	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	ctx.fillStyle = '#1e293b';
	ctx.fillRect(0, 0, 256, 128);
	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = 4;
	ctx.strokeRect(10, 10, 236, 108);

	return canvas;
}

t.setup(() => {
	source = t.createTexture(createSourceCanvas());
	source.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(6, 10, 22);

	if (!source) return;

	const w = source.width;

	t.push();
	t.translate(0, 0);
	t.charColor(140, 220, 255, 100);
	t.char('=');
	t.rect(w, 1);
	t.pop();

	t.push();
	t.charColor(255, 255, 255);
	t.translate(-Math.floor(w / 2), 0);
	t.char('[');
	t.point();
	t.translate(w - 1, 0);
	t.char(']');
	t.point();
	t.pop();

	drawCenteredText('TextmodeSource.width', -12, [240, 245, 255]);
	drawCenteredText('The ideal width of the source in grid cells.', -10, [150, 170, 200]);

	drawCenteredText(`${w} CELLS`, 10, [140, 220, 255]);
	drawCenteredText('Calculated to fit the current grid aspect ratio.', 12, [100, 120, 150]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
