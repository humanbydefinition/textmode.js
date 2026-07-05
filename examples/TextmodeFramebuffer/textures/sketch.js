/**
 * @title TextmodeFramebuffer.textures
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
	// 3-attachment framebuffer: char data, charColor, cellColor
	fb = t.createFramebuffer({ width: 14, height: 10, attachments: 3 });
});

t.draw(() => {
	t.background(8, 10, 18);

	fb.begin();
	t.clear();
	t.background(10, 18, 28);
	t.charColor(140, 220, 255);
	t.char('T');
	t.push();
	t.rotateZ(t.frameCount * 2.0);
	t.rect(8, 6);
	t.pop();
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

	drawText('TEXTURES', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Array of WebGLTexture handles.', x, y++, 100, 220, 255);
	drawText('--------------------------------', x, y++, 80, 100, 150);

	const arr = fb ? fb.textures : [];
	drawText(`Count: ${arr.length} textures`, x, y++, 120, 255, 180);
	const labels = ['Char/transform', 'charColor', 'cellColor'];
	for (let i = 0; i < arr.length; i++) {
		const ok = arr[i] instanceof WebGLTexture;
		const label = labels[i] ?? 'extra';
		const state = ok ? 'OK' : 'null';
		drawText(`[${i}] ${label}: ${state}`, x, y++, 160, 160, 160);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
