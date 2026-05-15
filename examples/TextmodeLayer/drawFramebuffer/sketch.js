/**
 * @title TextmodeLayer.drawFramebuffer
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const sourceLayer = t.layers.add();

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

sourceLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.03;

	t.push();
	t.rotateZ((time * 180) / Math.PI);
	t.charColor(255, 180, 100);
	t.char('#');
	t.rect(14, 1);
	t.rect(1, 14);
	t.pop();
});

t.draw(() => {
	t.background(6, 10, 22);

	// The drawFramebuffer property provides access to the internal WebGL
	const fb = sourceLayer.drawFramebuffer;

	drawCenteredText('TextmodeLayer.drawFramebuffer', -12, [240, 245, 255]);
	drawCenteredText('Capturing the pre-ASCII raw drawing state.', -10, [150, 170, 200]);

	if (fb) {
		t.push();
		t.translate(0, 0);
		t.image(fb, 24, 14);
		t.pop();

		drawCenteredText('INTERNAL DATA BUFFER', 10, [140, 220, 255]);
		drawCenteredText(`${fb.width} x ${fb.height} COORDINATE UNITS`, 12, [100, 120, 150]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
