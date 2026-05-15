/**
 * @title LayerManager.add
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const layer1 = t.layers.add({ blendMode: 'screen', opacity: 0.8 });
const layer2 = t.layers.add({ blendMode: 'additive', opacity: 0.6 });

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

function drawOrbit(radius, speed, rgb, offset = 0) {
	const angle = t.frameCount * speed + offset;
	const x = Math.round(Math.cos(angle) * radius * 1.7);
	const y = Math.round(Math.sin(angle) * radius);

	t.push();
	t.translate(x, y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.char('o');
	t.point();
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);

	drawCenteredText('Base Layer', -8, [240, 245, 255]);
	drawOrbit(6, 0.03, [70, 160, 255], 0);
	drawOrbit(6, 0.03, [70, 160, 255], Math.PI);
});

layer1.draw(() => {
	t.clear();

	drawCenteredText('Layer 1', 0, [255, 200, 100]);
	drawOrbit(4, -0.05, [255, 120, 80], Math.PI / 2);
	drawOrbit(4, -0.05, [255, 120, 80], (Math.PI * 3) / 2);
});

layer2.draw(() => {
	t.clear();

	drawCenteredText('Layer 2', 8, [120, 255, 180]);
	drawOrbit(3, 0.07, [80, 255, 140], Math.PI / 4);
	drawOrbit(3, 0.07, [80, 255, 140], (Math.PI * 5) / 4);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
