/**
 * @title TextmodeLayer.height
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const detailLayer = t.layers.add({ fontSize: 8 });

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

	const h = detailLayer.height;
	const g = detailLayer.grid;

	t.push();
	t.translate(0, 0);
	t.char('|');
	t.charColor(120, 180, 255, 100);
	t.rect(1, t.grid.rows);
	t.pop();

	drawCenteredText('TextmodeLayer.height', -12, [240, 245, 255]);
	drawCenteredText('Total pixel height of the layer ASCII framebuffer.', -10, [150, 170, 200]);
	drawCenteredText(`${h} PIXELS`, 10, [140, 220, 255]);
	drawCenteredText(`${g.rows} ROWS x ${g.cellHeight}PX`, 12, [100, 120, 150]);
});

detailLayer.draw(() => {
	t.clear();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
