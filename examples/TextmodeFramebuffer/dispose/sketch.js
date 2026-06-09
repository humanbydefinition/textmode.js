/**
 * @title TextmodeFramebuffer.dispose
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let fb = null;
let fbSize = 12;
let growing = true;

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

function rebuildFramebuffer() {
	if (fb) fb.dispose();

	if (growing) {
		fbSize += 2;
		if (fbSize >= 20) growing = false;
	} else {
		fbSize -= 2;
		if (fbSize <= 10) growing = true;
	}

	fb = t.createFramebuffer({ width: fbSize, height: fbSize });
	fb.begin();
	t.background(15, 10, 30);
	t.charColor(255, 100, 150);
	t.char('+');
	t.rect(fbSize, fbSize);
	fb.end();
}

t.setup(() => {
	rebuildFramebuffer();
});

t.draw(() => {
	t.background(8, 10, 18);

	if (t.frameCount % 90 === 0) rebuildFramebuffer();

	t.push();
	t.translate(0, 2);
	t.rotateZ(t.frameCount * 1.5);
	t.image(fb);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('DISPOSE', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Releases GPU resources early.', x, y++, 100, 220, 255);
	drawText('Framebuffer is rebuilt every 90 frames.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText(`Size: ${fbSize}x${fbSize} cells`, x, y++, 120, 255, 180);
	const rem = 90 - (t.frameCount % 90);
	drawText(`Rebuild in: ${rem} frames`, x, y++, 160, 160, 160);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
