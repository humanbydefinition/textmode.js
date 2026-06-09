/**
 * @title TextmodeLayer.height
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const detailLayer = t.layers.add({ fontSize: 8 });
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
	t.translate(0, 0);
	t.char('|');
	t.charColor(120, 180, 255, 100);
	t.rect(1, t.grid.rows);
	t.pop();
});

detailLayer.draw(() => {
	t.clear();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const g = detailLayer.grid;

	drawText('TEXTMODELAYER.HEIGHT', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: LAYER PIXEL HEIGHT', x, y++, [100, 220, 255]);
	drawText('Reports ASCII framebuffer height.', x, y++, [140, 160, 190]);
	drawText('Finer font size gives more rows.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`${detailLayer.height} PIXELS`, x, y++, [140, 255, 180]);
	drawText(`${g.rows} ROWS x ${g.cellHeight}PX`, x, y++, [120, 200, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
