/**
 * @title TextmodeFont.framebuffer
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

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
	t.background(6, 10, 22);

	const atlas = t.font.framebuffer;

	drawCenteredText('TextmodeFont.framebuffer', -6, [240, 245, 255]);
	drawCenteredText(atlas.width + ' x ' + atlas.height + ' px', 0, [180, 200, 220]);
	drawCenteredText(t.font.textureColumns + ' cols x ' + t.font.textureRows + ' rows', 4, [150, 170, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
