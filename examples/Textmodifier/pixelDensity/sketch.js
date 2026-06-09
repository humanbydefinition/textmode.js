/**
 * @title Textmodifier.pixelDensity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let density = 1;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.mouseClicked(() => {
	density = density === 1 ? 2 : 1;
	t.pixelDensity(density);
});

t.draw(() => {
	t.background(6, 10, 22);

	// Crosshair pattern: higher pixel density yields finer lines.
	const step = 4;
	const max = 18;
	t.cellColor(20, 25, 45);
	for (let i = -max; i <= max; i += step) {
		t.rect(1, 1);
		t.translate(1, 0);
		t.point();
	}
	for (let i = -max; i <= max; i += step) {
		t.push();
		t.translate(0, i);
		t.rect(1, 1);
		t.pop();
	}

	// Diagonal stepped line: smoother at higher resolution.
	t.cellColor(60, 140, 200);
	t.push();
	t.translate(-4, -4);
	for (let i = 0; i < 9; i++) {
		t.char('#');
		t.point();
		t.translate(1, 1);
	}
	t.pop();

	// Pulse ring that reveals grid density.
	const radius = 8 + Math.sin(t.frameCount * 0.05) * 3;
	t.cellColor(200, 120, 60);
	t.char('*');
	t.charColor(200, 120, 60);
	t.ellipse(radius * 2, radius);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.PIXELDENSITY', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RETINA RENDERING', x, y++, 100, 220, 255);
	drawText('Click to toggle pixel density.', x, y++, 140, 160, 190);
	drawText('Backing store scales, CSS fixed.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`DENSITY: ${t.pixelDensity()}x`, x, y++, 140, 255, 180);
	drawText(`BACKING: ${t.width}x${t.height}`, x, y++, 140, 255, 180);
	drawText(`GRID: ${t.grid.cols}x${t.grid.rows}`, x, y++, 100, 200, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
