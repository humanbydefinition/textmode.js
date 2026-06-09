/**
 * @title TextmodeLayer.fontSize
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const detailLayer = t.layers.add({ fontSize: 8, blendMode: 'screen' });
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
	t.charColor(40, 50, 80);
	t.char('#');
	t.rect(20, 10);
	t.pop();
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
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODELAYER.FONTSIZE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: PER-LAYER RESOLUTION', x, y++, [100, 220, 255]);
	drawText('Smaller font gives denser cells.', x, y++, [140, 160, 190]);
	drawText('Layer grids update independently.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`BASE: ${t.layers.base.fontSize()} PX`, x, y++, [140, 180, 255]);
	drawText(`DETAIL: ${detailLayer.fontSize()} PX`, x, y++, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
