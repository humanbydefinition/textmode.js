/**
 * @title Textmodifier.perspective
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let fov = 60;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 8, 18);
	fov = 60 + Math.sin(t.frameCount * 0.03) * 25;
	t.perspective(fov, 0.1, 4096);
	t.camera(0, 0, 44, 0, 0, 0);
	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate((i - 1) * 8, 0, i * -12);
		t.char('#');
		t.charColor(120 + i * 40, 220, 255 - i * 20);
		t.box(6, 6, 6);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.PERSPECTIVE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: FOV PROJECTION', x, y++, 100, 220, 255);
	drawText('FOV breathes wide to narrow.', x, y++, 140, 160, 190);
	drawText('Depth changes apparent size.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`FOV: ${fov.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
