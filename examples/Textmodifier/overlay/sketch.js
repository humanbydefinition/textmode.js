/**
 * @title Textmodifier.overlay
 */
const sourceCanvas = document.createElement('canvas');
const sourceCtx = sourceCanvas.getContext('2d');

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
sourceCanvas.style.position = 'fixed';
sourceCanvas.style.inset = '0';
sourceCanvas.style.width = '100vw';
sourceCanvas.style.height = '100vh';
sourceCanvas.style.display = 'block';
document.body.appendChild(sourceCanvas);

const t = textmode.create({
	canvas: sourceCanvas,
	overlay: true,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

function resizeSourceCanvas() {
	sourceCanvas.width = window.innerWidth;
	sourceCanvas.height = window.innerHeight;
}

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function paintSourceCanvas() {
	const pulse = t.frameCount * 0.035;
	sourceCtx.fillStyle = '#050816';
	sourceCtx.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);
	sourceCtx.fillStyle = '#38bdf8';
	sourceCtx.fillRect(sourceCanvas.width * 0.24 + Math.sin(pulse) * 30, sourceCanvas.height * 0.42, 128, 82);
	sourceCtx.fillStyle = '#f59e0b';
	sourceCtx.beginPath();
	sourceCtx.arc(sourceCanvas.width * 0.68, sourceCanvas.height * 0.5, 54, 0, Math.PI * 2);
	sourceCtx.fill();
	sourceCtx.fillStyle = '#f8fafc';
	sourceCtx.fillRect(sourceCanvas.width * 0.33, sourceCanvas.height * 0.68, 150, 28);
}

resizeSourceCanvas();

t.setup(() => {
	if (!t.overlay) return;
	t.overlay.characters(' .:-=+*#%@').charColorMode('sampled').cellColorMode('fixed').cellColor('#050816');
});

t.draw(() => {
	paintSourceCanvas();
	t.clear();
	if (!t.overlay) return;

	t.image(t.overlay, t.grid.cols, t.grid.rows);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.OVERLAY', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: TARGET CANVAS SOURCE', x, y++, 100, 220, 255);
	drawText('overlay samples sourceCanvas.', x, y++, 140, 160, 190);
	drawText('Textmode renders above it.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const state = t.overlay ? 'READY' : 'WAIT';
	drawText(`OVERLAY: ${state}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	resizeSourceCanvas();
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
