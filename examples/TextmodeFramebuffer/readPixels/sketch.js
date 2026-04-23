/**
 * @title TextmodeFramebuffer.readPixels
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const framebuffer = t.createFramebuffer({ width: 12, height: 12 });

function drawLabel(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.draw(() => {
	framebuffer.begin();
	t.background(0, 0, 0);
	t.push();
	t.rotateZ(t.frameCount * 2);
	t.charColor(255, 120, 80);
	t.cellColor(20, 80, 160);
	t.rect(framebuffer.width - 4, framebuffer.height - 4);
	t.pop();
	framebuffer.end();

	const pixels = framebuffer.readPixels(1);
	const centerIndex = ((Math.floor(framebuffer.height / 2) * framebuffer.width) + Math.floor(framebuffer.width / 2)) * 4;
	const rgba = pixels.slice(centerIndex, centerIndex + 4);

	t.background(6, 8, 18);
	t.image(framebuffer, framebuffer.width * 2, framebuffer.height * 2);

	drawLabel('readPixels(1)', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	drawLabel(`center rgba ${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]}`, Math.floor(t.grid.rows * 0.28));
	drawLabel(`buffer bytes ${pixels.length}`, Math.floor(t.grid.rows * 0.36), [120, 205, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
