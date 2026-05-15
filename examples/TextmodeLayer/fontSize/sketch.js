/**
 * @title TextmodeLayer.fontSize
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const detailLayer = t.layers.add({ fontSize: 8, blendMode: 'screen' });

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

	drawCenteredText('TextmodeLayer.fontSize', -12, [240, 245, 255]);
	drawCenteredText('FontSize determines the grid resolution of each layer.', -10, [150, 170, 200]);

	t.push();
	t.translate(0, 0);
	t.charColor(40, 50, 80);
	t.char('#');
	t.rect(20, 10);
	t.pop();

	drawCenteredText(`BASE LAYER: ${t.layers.base.fontSize()} PX`, 7, [140, 180, 255]);
});

detailLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.03;

	t.push();
	t.translate(0, -2);
	t.charColor(255, 225, 140, 150);
	t.char('.');

	for (let i = 0; i < 40; i++) {
		const angle = time + i * 0.2;
		const r = 12 + Math.sin(time + i * 0.5) * 4;
		t.push();
		t.translate(Math.round(Math.cos(angle) * r * 1.5), Math.round(Math.sin(angle) * r * 0.6));
		t.point();
		t.pop();
	}
	t.pop();

	drawCenteredText(`DETAIL LAYER: ${detailLayer.fontSize()} PX`, 12, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
