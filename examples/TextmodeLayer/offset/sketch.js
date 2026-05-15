/**
 * @title TextmodeLayer.offset
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const offsetLayer = t.layers.add({ blendMode: 'additive' });

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

	const time = t.frameCount * 0.03;
	const g = t.grid;

	const offX = Math.round(Math.cos(time) * (g.width * 0.25));
	const offY = Math.round(Math.sin(time * 0.7) * (g.height * 0.25));

	offsetLayer.offset(offX, offY);

	const targetGridX = Math.round(offX / g.cellWidth);
	const targetGridY = Math.round(offY / g.cellHeight);

	t.push();
	t.charColor(60, 70, 100, 150);
	t.char('.');
	t.line(0, 0, targetGridX, targetGridY);
	t.pop();

	t.push();
	t.charColor(100, 120, 150);
	t.char('+');
	t.point();
	t.pop();

	drawCenteredText('TextmodeLayer.offset', -12, [240, 245, 255]);
	drawCenteredText('Translating the entire layer coordinate system in pixels.', -10, [150, 170, 200]);

	drawCenteredText(`OFFSET X: ${offX} PX`, 8, [255, 180, 100]);
	drawCenteredText(`OFFSET Y: ${offY} PX`, 10, [255, 180, 100]);
});

offsetLayer.draw(() => {
	t.clear();

	t.push();
	t.charColor(255, 180, 100);
	t.char('#');
	t.rect(7, 3);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
