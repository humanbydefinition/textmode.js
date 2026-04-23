/**
 * @title Textmodifier.createTexture
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const sourceCanvas = document.createElement('canvas');
sourceCanvas.width = 180;
sourceCanvas.height = 120;

const sourceContext = sourceCanvas.getContext('2d');
const texture = t.createTexture(sourceCanvas);
texture.characters(' .:-=+*#%@');

function drawSourceCanvas() {
	if (!sourceContext) {
		return;
	}

	const time = t.frameCount * 0.05;
	sourceContext.fillStyle = '#050816';
	sourceContext.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);

	const gradient = sourceContext.createLinearGradient(0, 0, sourceCanvas.width, sourceCanvas.height);
	gradient.addColorStop(0, '#1d4ed8');
	gradient.addColorStop(1, '#fb7185');
	sourceContext.fillStyle = gradient;
	sourceContext.fillRect(18, 18, sourceCanvas.width - 36, sourceCanvas.height - 36);

	sourceContext.save();
	sourceContext.translate(sourceCanvas.width / 2, sourceCanvas.height / 2);
	sourceContext.rotate(time * 0.8);
	sourceContext.fillStyle = '#fef08a';
	sourceContext.fillRect(-18, -44, 36, 88);
	sourceContext.restore();
}

function drawLabel(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.draw(() => {
	drawSourceCanvas();

	t.background(5, 7, 18);
	t.image(texture, t.grid.cols - 8, t.grid.rows - 10);

	drawLabel('createTexture(canvas)', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	drawLabel(`source matches ${texture.source === sourceCanvas ? 'yes' : 'no'}`, Math.floor(t.grid.rows * 0.30), [120, 205, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
