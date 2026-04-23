/**
 * @title TextmodeFramebuffer.framebuffer
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const framebuffer = t.createFramebuffer({ width: 26, height: 14, attachments: 4 });

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
	t.background(10, 14, 28);
	t.push();
	t.rotateZ(t.frameCount * 1.6);
	t.char('F');
	t.charColor(255, 214, 120);
	t.rect(framebuffer.width - 6, framebuffer.height - 6);
	t.pop();
	framebuffer.end();

	t.background(4, 6, 14);
	t.image(framebuffer, framebuffer.width, framebuffer.height);

	drawLabel(`width ${framebuffer.width}  height ${framebuffer.height}`, -Math.floor(t.grid.rows * 0.34), [255, 220, 140]);
	drawLabel(`framebuffer ${framebuffer.framebuffer ? 'allocated' : 'missing'}`, Math.floor(t.grid.rows * 0.28));
	drawLabel(`textures ${framebuffer.textures.length}  attachments ${framebuffer.attachmentCount}`, Math.floor(t.grid.rows * 0.36), [120, 205, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
