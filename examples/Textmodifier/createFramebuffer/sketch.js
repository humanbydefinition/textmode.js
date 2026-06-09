/**
 * @title Textmodifier.createFramebuffer
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const fb = t.createFramebuffer({ width: 24, height: 14 });

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	fb.begin();
	t.clear();
	t.background(20, 30, 60);
	t.char('#');
	t.charColor(255, 210, 120);
	t.rect(12, 4);
	fb.end();
	t.image(fb);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CREATEFRAMEBUFFER', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: OFFSCREEN BUFFER', x, y++, 100, 220, 255);
	drawText('Renders into a framebuffer.', x, y++, 140, 160, 190);
	drawText('Then draws it to the scene.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SIZE: ${fb.width} x ${fb.height}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
