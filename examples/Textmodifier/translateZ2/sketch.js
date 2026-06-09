/**
 * @title Textmodifier.translateZ2
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	t.perspective(58, 0.1, 4096);
	t.camera(0, 0, 48, 0, 0, 0);
	const time = t.frameCount * 0.03;
	for (let i = 0; i < 4; i++) {
		t.push();
		t.translate((i - 1.5) * 7, 0, 0);
		t.translateZ(Math.sin(time + i) * 18);
		t.char('#');
		t.charColor(120 + i * 30, 220, 255 - i * 20);
		t.box(4, 4, 4);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.TRANSLATEZ2', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DEPTH MOTION', x, y++, 100, 220, 255);
	drawText('Boxes move toward camera.', x, y++, 140, 160, 190);
	drawText('Z changes perspective scale.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('API: t.translateZ(z)', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
