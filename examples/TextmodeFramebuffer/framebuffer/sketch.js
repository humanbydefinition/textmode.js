/**
 * @title TextmodeFramebuffer.framebuffer
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
	fb = t.createFramebuffer({ width: 14, height: 14 });
});

t.draw(() => {
	t.background(8, 10, 18);

	fb.begin();
	t.clear();
	t.background(10, 20, 32);
	t.charColor(120, 220, 255);
	t.char('F');
	t.push();
	t.rotateZ(t.frameCount * 2.0);
	t.rect(8, 8);
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

	drawText('FRAMEBUFFER', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('The raw WebGLFramebuffer handle.', x, y++, 100, 220, 255);
	drawText('--------------------------------', x, y++, 80, 100, 150);

	const handleExists = fb && fb.framebuffer !== null;
	const typeName = fb && fb.framebuffer ? fb.framebuffer.constructor.name : 'null';
	const handle = handleExists ? 'Active' : 'null';
	drawText(`HANDLE: ${handle}`, x, y++, 120, 255, 180);
	drawText(`Type  : ${typeName}`, x, y++, 160, 160, 160);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
