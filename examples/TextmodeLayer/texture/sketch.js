/**
 * @title TextmodeLayer.texture
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const layer = t.layers.add({ fontSize: 16, blendMode: 'screen' });

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
	t.background(5, 7, 18);

	const textureMatches = layer.texture === layer.asciiFramebuffer.textures[0];
	label('TextmodeLayer.texture', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	label(textureMatches ? 'texture matches ascii framebuffer' : 'texture pending', Math.floor(t.grid.rows * 0.30), [120, 205, 255]);
});

layer.draw(() => {
	t.clear();
	t.push();
	t.rotateZ(t.frameCount * 1.5);
	t.charColor(120, 205, 255);
	t.rect(18, 8);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
