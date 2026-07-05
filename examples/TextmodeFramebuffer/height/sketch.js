/**
 * @title TextmodeFramebuffer.height
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
	fb = t.createFramebuffer({ width: 14, height: 12 });
});

t.draw(() => {
	t.background(8, 10, 18);

	// Draw vertical ruler ticks inside the framebuffer showing height in cells
	fb.begin();
	t.clear();
	t.background(24, 12, 18);
	t.charColor(255, 100, 150);
	t.char('-');
	t.rect(fb.width, fb.height);
	for (let row = 0; row < fb.height; row++) {
		const cx = -Math.floor(fb.width / 2);
		const cy = -Math.floor(fb.height / 2) + row;
		drawText(`${row}`, cx + 1, cy, 255, 220, 140);
	}
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

	drawText('HEIGHT', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Framebuffer height in cells (rows).', x, y++, 100, 220, 255);
	drawText('--------------------------------', x, y++, 80, 100, 150);

	const val = fb ? fb.height : 0;
	drawText(`Framebuffer Height: ${val} cells`, x, y++, 120, 255, 180);
	drawText(`Canvas   : ${t.height} px`, x, y++, 160, 160, 160);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
