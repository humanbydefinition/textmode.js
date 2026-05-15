/**
 * @title TextmodeLayer.width
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

	const w = detailLayer.width;
	const g = detailLayer.grid;

	t.push();
	t.translate(0, 0);
	t.char('=');
	t.charColor(120, 180, 255, 100);
	t.rect(t.grid.cols, 1);
	t.pop();

	drawCenteredText('TextmodeLayer.width', -12, [240, 245, 255]);
	drawCenteredText('Total pixel width of the layer ASCII framebuffer.', -10, [150, 170, 200]);
	drawCenteredText(`${w} PIXELS`, 6, [140, 220, 255]);
	drawCenteredText(`${g.cols} CELLS x ${g.cellWidth}PX`, 8, [100, 120, 150]);
});

detailLayer.draw(() => {
	t.clear();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
