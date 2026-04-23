/**
 * @title TextmodeSource.dispose
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const sourceCanvas = document.createElement('canvas');
sourceCanvas.width = 160;
sourceCanvas.height = 120;

const sourceContext = sourceCanvas.getContext('2d');
let source = null;
let disposed = false;

function renderSource() {
	if (!sourceContext) {
		return;
	}

	sourceContext.fillStyle = '#050816';
	sourceContext.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);
	sourceContext.fillStyle = '#60a5fa';
	sourceContext.fillRect(24, 20, 112, 80);
	sourceContext.fillStyle = '#fef08a';
	sourceContext.fillRect(56, 34, 48, 52);
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

	if (source && !disposed) {
		t.image(source, t.grid.cols - 8, t.grid.rows - 10);
	}

	label('click to dispose source', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	label(disposed ? 'source disposed' : 'source active', Math.floor(t.grid.rows * 0.30), [120, 205, 255]);
});

t.mouseClicked(() => {
	if (!source || disposed) {
		return;
	}

	source.dispose();
	disposed = true;
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
