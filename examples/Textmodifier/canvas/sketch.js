/**
 * @title Textmodifier.canvas
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const labelLayer = t.layers.add();

t.canvas.title = 'Textmodifier.canvas';
t.canvas.dataset.example = 'canvas';
t.canvas.style.background = '#060713';
t.canvas.style.outlineOffset = '-4px';

function updateCanvasElement() {
	const hue = Math.floor((t.frameCount * 2) % 360);
	t.canvas.style.outline = `3px solid hsl(${hue}, 90%, 62%)`;
	t.canvas.style.boxShadow = `0 0 24px hsla(${hue}, 90%, 62%, 0.28)`;
}

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	updateCanvasElement();
	t.background(6, 8, 20);

	const cols = Math.floor(t.grid.cols / 2);
	const rows = Math.floor(t.grid.rows / 2);
	t.charColor(255, 190, 80);
	for (let x = -cols; x <= cols; x += 4) {
		t.push();
		t.translate(x, -rows + 1);
		t.char('=');
		t.point();
		t.translate(0, rows * 2 - 2);
		t.point();
		t.pop();
	}
	for (let y = -rows + 1; y < rows; y += 2) {
		t.push();
		t.translate(-cols + 1, y);
		t.char('|');
		t.point();
		t.translate(cols * 2 - 2, 0);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const size = `${t.canvas.width}x${t.canvas.height}`;
	const title = t.canvas.title;

	drawText('TEXTMODIFIER.CANVAS', x, y++, 255, 190, 80);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DOM CANVAS ACCESS', x, y++, 100, 220, 255);
	drawText('The getter returns the element.', x, y++, 140, 160, 190);
	drawText('CSS and metadata update live.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SIZE: ${size}`, x, y++, 140, 190, 255);
	drawText(`TITLE: ${title}`, x, y++, 150, 240, 170);
	drawText('DATASET: canvas', x, y++, 150, 240, 170);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
