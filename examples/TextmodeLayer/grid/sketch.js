/**
 * @title TextmodeLayer.grid
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const densityLayer = t.layers.add({ fontSize: 8, blendMode: 'screen' });
const labelLayer = t.layers.add();

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);

	t.push();
	t.translate(-10, 0);
	t.charColor(100, 150, 255, 100);
	t.char('+');
	t.rect(14, 10);
	t.pop();
});

densityLayer.draw(() => {
	t.clear();

	t.push();
	t.translate(20, 0);
	t.charColor(255, 225, 140, 150);
	t.char('.');
	t.rect(28, 20);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const g = densityLayer.grid;

	drawText('TEXTMODELAYER.GRID', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: INDEPENDENT GRID', x, y++, [100, 220, 255]);
	drawText('Each layer gets its own grid.', x, y++, [140, 160, 190]);
	drawText('Font size changes cell count.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`BASE: ${t.grid.cols} x ${t.grid.rows}`, x, y++, [140, 180, 255]);
	drawText(`LAYER: ${g.cols} x ${g.rows}`, x, y++, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
