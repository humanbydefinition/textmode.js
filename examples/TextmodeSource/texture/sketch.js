/**
 * @title TextmodeSource.texture
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const sourceCanvas = document.createElement('canvas');
sourceCanvas.width = 180;
sourceCanvas.height = 120;

const sourceContext = sourceCanvas.getContext('2d');
let source = null;

function renderSource() {
	if (!sourceContext) {
		return;
	}

	const gradient = sourceContext.createLinearGradient(0, 0, sourceCanvas.width, sourceCanvas.height);
	gradient.addColorStop(0, '#020617');
	gradient.addColorStop(1, '#1d4ed8');
	sourceContext.fillStyle = gradient;
	sourceContext.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);
	sourceContext.fillStyle = '#f97316';
	sourceContext.fillRect(24, 24, 132, 72);
}

function label(text, y, color = [220, 220, 220]) {
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

t.setup(() => {
	renderSource();
	source = t.createTexture(sourceCanvas);
	source.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(5, 7, 18);

	if (source) {
		t.image(source, t.grid.cols - 8, t.grid.rows - 10);
	}

	label('TextmodeSource.texture', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	label(source && source.texture ? 'webgl texture available' : 'texture pending', Math.floor(t.grid.rows * 0.30), [120, 205, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
