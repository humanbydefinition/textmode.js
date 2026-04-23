/**
 * @title TextmodeLayerManager.resultFramebuffer
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const glowLayer = t.layers.add({ fontSize: 16, blendMode: 'screen' });

function label(text, y, color = [220, 220, 220]) {
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
	t.background(6, 9, 18);
	t.push();
	t.rotateZ(t.frameCount * 1.1);
	t.charColor(255, 230, 150);
	t.rect(14, 14);
	t.pop();

	const result = t.layers.resultFramebuffer;

	label(`result framebuffer ${result.width} x ${result.height}`, -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	label(`attachments ${result.attachmentCount}`, Math.floor(t.grid.rows * 0.32), [120, 205, 255]);
});

glowLayer.draw(() => {
	t.clear();
	t.push();
	t.rotateZ(-t.frameCount * 1.7);
	t.charColor(110, 205, 255);
	t.rect(20, 6);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
