/**
 * @title TextmodeLayer.grid
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const densityLayer = t.layers.add({ fontSize: 8, blendMode: 'screen' });

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

	const g = t.grid;

	drawCenteredText('TextmodeLayer.grid', -12, [240, 245, 255]);
	drawCenteredText('Every layer has its own independent coordinate grid.', -10, [150, 170, 200]);

	t.push();
	t.translate(-10, 0);
	t.charColor(100, 150, 255, 100);
	t.char('+');
	t.rect(14, 10);
	t.pop();

	drawCenteredText(`BASE GRID: ${g.cols} x ${g.rows}`, 8, [140, 180, 255]);
});

densityLayer.draw(() => {
	t.clear();

	// Access this specific layer's grid via the .grid property.
	const g = densityLayer.grid;

	t.push();
	t.translate(20, 0);
	t.charColor(255, 225, 140, 150);
	t.char('.');
	t.rect(28, 20);
	t.pop();

	drawCenteredText(`LAYER GRID: ${g.cols} x ${g.rows}`, 12, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
