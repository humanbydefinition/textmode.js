/**
 * @title TextmodeFramebuffer.resize
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let fb;
let currentW = 12;
let currentH = 8;

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
	fb = t.createFramebuffer({ width: currentW, height: currentH });
});

t.draw(() => {
	t.background(8, 10, 18);

	// Oscillate framebuffer dimensions to demonstrate resize()
	const nextW = 10 + Math.round((Math.sin(t.frameCount * 0.03) * 0.5 + 0.5) * 16);
	const nextH = 6 + Math.round((Math.cos(t.frameCount * 0.04) * 0.5 + 0.5) * 10);

	if (nextW !== currentW || nextH !== currentH) {
		fb.resize(nextW, nextH);
		currentW = nextW;
		currentH = nextH;
	}

	fb.begin();
	t.clear();
	t.background(20, 10, 35);
	t.charColor(255, 200, 100);
	t.char('#');
	t.rect(currentW, currentH);
	const sizeStr = `${currentW}x${currentH}`;
	drawText(sizeStr, -Math.floor(sizeStr.length / 2), 0, 255, 255, 255);
	fb.end();

	t.push();
	t.translate(0, 3);
	t.rotateZ(Math.sin(t.frameCount * 0.02) * 5);
	t.image(fb);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('RESIZE', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Resize offscreen textures live.', x, y++, 100, 220, 255);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText(`W: ${currentW}  H: ${currentH} cells`, x, y++, 120, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
