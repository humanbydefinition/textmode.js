/**
 * @title TextmodeSource.width
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const sourceCanvas = document.createElement('canvas');
sourceCanvas.width = 192;
sourceCanvas.height = 96;

const sourceContext = sourceCanvas.getContext('2d');
let source = null;

function renderSource() {
	if (!sourceContext) {
		return;
	}

	sourceContext.fillStyle = '#020617';
	sourceContext.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);
	sourceContext.fillStyle = '#34d399';
	sourceContext.fillRect(18, 18, sourceCanvas.width - 36, sourceCanvas.height - 36);
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
		label(`width ${source.width}  height ${source.height}`, Math.floor(t.grid.rows * 0.24));
		label(`original ${source.originalWidth} x ${source.originalHeight}`, Math.floor(t.grid.rows * 0.34), [120, 205, 255]);
	}

	label('TextmodeSource dimensions', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
