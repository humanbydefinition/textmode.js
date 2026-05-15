/**
 * @title TextmodeLayer.asciiFramebuffer
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const layer = t.layers.add({ blendMode: 'screen' });

function drawLabel(text, x, y, col = [255, 255, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(...col);
	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}
	t.pop();
}

layer.draw(() => {
	t.clear();
	t.push();
	t.rotateZ(t.frameCount * 2);
	t.char('*');
	t.charColor(120, 220, 255);
	t.rect(14, 8);
	t.pop();
});

t.draw(() => {
	t.background(8, 10, 18);

	const fb = layer.asciiFramebuffer;
	const { cols, rows } = t.grid;

	if (fb) {
		const pixels = fb.readPixels(0);
		const cx = Math.floor(fb.width / 2);
		const cy = Math.floor(fb.height / 2);
		const index = (cy * fb.width + cx) * 4;

		const r = pixels[index];
		const g = pixels[index + 1];
		const b = pixels[index + 2];

		const title = '--- ASCII FRAMEBUFFER ---';
		drawLabel(title, -(title.length - 1) / 2, -(rows - 1) / 2 + 2, [255, 220, 100]);

		const info = `Read center pixel: rgb(${r}, ${g}, ${b})`;
		drawLabel(info, -(info.length - 1) / 2, (rows - 1) / 2 - 2, [150, 180, 255]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
