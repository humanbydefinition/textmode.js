/**
 * @title Textmodifier.createFramebuffer
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const fb = t.createFramebuffer({
	width: 24,
	height: 14,
});

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.cellColor(0, 0, 0, 0);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

labelLayer.draw(() => {
	t.clear();

	drawCenteredText('Textmodifier.createFramebuffer', -12, [240, 245, 255]);
	drawCenteredText('Creating an offscreen buffer for nested rendering.', -10, [150, 170, 200]);

	drawCenteredText('FRAMEBUFFER METRICS', 8, [140, 255, 180]);
	drawCenteredText(`COLS: ${fb.width}  ROWS: ${fb.height}  ATTACHMENTS: ${fb.attachmentCount}`, 10, [140, 180, 255]);

	drawCenteredText('t.createFramebuffer({ width, height })', 13, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);
	const time = t.frameCount * 0.05;

	fb.begin();
	t.clear();
	t.background(20, 30, 60);

	t.push();
	t.rotateZ(time * 30);
	t.charColor(255, 180, 100);
	t.char('#');
	t.rect(11, 5);
	t.pop();

	t.push();
	t.charColor(120, 180, 255);
	t.char('+');
	t.point();
	t.pop();
	fb.end();

	t.push();
	// t.rotateZ(Math.sin(time * 0.5) * 10);
	t.image(fb);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
