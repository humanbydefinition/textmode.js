/**
 * @title TextmodeFramebuffer.readPixels
 */
const t = textmode.create({
	pixelDensity: 1,
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
	fb = t.createFramebuffer({ width: 8, height: 8 });
});

t.draw(() => {
	t.background(8, 10, 18);

	fb.begin();
	t.clear();
	t.background(10, 15, 30);
	t.push();
	t.rotateZ(t.frameCount * 2.5);
	t.charColor(255, 120, 80);
	t.char('*');
	t.rect(6, 2);
	t.pop();
	fb.end();

	// Read charColor attachment and render a char-mapped pixel grid
	const pixels = fb.readPixels(1);
	t.push();
	t.translate(5, -1);
	for (let py = 0; py < 8; py++) {
		for (let px = 0; px < 8; px++) {
			const idx = (py * 8 + px) * 4;
			const r = pixels[idx],
				g = pixels[idx + 1],
				b = pixels[idx + 2];
			t.push();
			t.translate(px, py);
			if (r > 30 || g > 30 || b > 30) {
				t.charColor(r, g, b);
				t.char('#');
			} else {
				t.charColor(40, 50, 70);
				t.char('.');
			}
			t.point();
			t.pop();
		}
	}
	t.pop();

	t.push();
	t.translate(-8, 3);
	t.image(fb, 16, 16);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('READPIXELS', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Raw RGBA bytes from attachment.', x, y++, 100, 220, 255);
	drawText('Right: char-map of pixel data.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);

	const px = fb ? fb.readPixels(1) : [];
	drawText(`Buffer: ${px.length} bytes`, x, y++, 120, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
