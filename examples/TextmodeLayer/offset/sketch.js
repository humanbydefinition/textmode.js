/**
 * @title TextmodeLayer.offset
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const offsetLayer = t.layers.add({ blendMode: 'additive' });
const labelLayer = t.layers.add();
let currentOffset = { x: 0, y: 0 };

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.03;
	const g = t.grid;

	const offX = Math.round(Math.cos(time) * (g.width * 0.25));
	const offY = Math.round(Math.sin(time * 0.7) * (g.height * 0.25));

	currentOffset = { x: offX, y: offY };
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
});

offsetLayer.draw(() => {
	t.clear();

	t.push();
	t.charColor(255, 180, 100);
	t.char('#');
	t.rect(7, 3);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODELAYER.OFFSET', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: PIXEL OFFSET', x, y++, [100, 220, 255]);
	drawText('Moves the layer during composite.', x, y++, [140, 160, 190]);
	drawText('Drawing coordinates stay local.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`OFFSET X: ${currentOffset.x} PX`, x, y++, [255, 180, 100]);
	drawText(`OFFSET Y: ${currentOffset.y} PX`, x, y++, [255, 180, 100]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
