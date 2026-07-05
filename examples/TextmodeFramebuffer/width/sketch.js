/**
 * @title TextmodeFramebuffer.width
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let fb;

function drawText(text, x, y, r = 200, g = 220, b = 255) {
	t.push();
	t.translate(x, y);
	t.charColor(r, g, b);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

t.setup(() => {
	fb = t.createFramebuffer({ width: 22, height: 10 });
});

t.draw(() => {
	t.background(8, 10, 18);

	fb.begin();
	t.clear();
	t.background(12, 24, 18);

	// Border
	t.charColor(100, 255, 150);
	t.char('|');
	t.rect(fb.width, fb.height);

	fb.end();

	t.push();
	t.translate(0, 3);
	t.image(fb);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('WIDTH', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Framebuffer width in cells (cols).', x, y++, 100, 220, 255);
	drawText('--------------------------------', x, y++, 80, 100, 150);

	const val = fb ? fb.width : 0;
	drawText(`Framebuffer Width: ${val} cells`, x, y++, 120, 255, 180);
	drawText(`Canvas  : ${t.width} px`, x, y++, 160, 160, 160);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
