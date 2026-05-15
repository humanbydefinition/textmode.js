/**
 * @title TextmodeLayer.opacity
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const pulseLayer = t.layers.add({ blendMode: 'additive' });

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

function drawMeter(value, y, rgb) {
	const width = 20;
	const activeBlocks = Math.round(value * width);

	t.push();
	t.translate(-width / 2, y);
	for (let i = 0; i < width; i++) {
		const active = i < activeBlocks;
		t.push();
		t.translate(i, 0);
		t.char(active ? '|' : '.');
		t.charColor(active ? rgb : [60, 70, 100]);
		t.point();
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.04;
	const opacity = 0.5 + 0.5 * Math.sin(time);

	// Update the layer's opacity property.
	pulseLayer.opacity(opacity);

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();

	drawCenteredText('TextmodeLayer.opacity', -10, [240, 245, 255]);
	drawCenteredText('Controlling the alpha transparency of a layer.', -8, [150, 170, 200]);

	drawMeter(opacity, 6, [255, 225, 140]);
	drawCenteredText(`OPACITY: ${opacity.toFixed(2)}`, 8, [255, 225, 140]);
});

pulseLayer.draw(() => {
	t.clear();

	t.push();
	t.charColor(255, 140, 180);
	t.char('#');
	t.rect(12, 6);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
