/**
 * @title TextmodeLayer.show
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const displayLayer = t.layers.add({ visible: false, blendMode: 'additive' });
const labelLayer = t.layers.add();
let isVisible = false;

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);

	if (t.frameCount % 120 === 0) {
		if (isVisible) {
			displayLayer.hide();
		} else {
			displayLayer.show();
		}
		isVisible = !isVisible;
	}

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();
});

displayLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.03;

	t.push();
	t.charColor(255, 180, 100);
	t.char('#');
	t.rotateZ((time * 180) / Math.PI);
	t.rect(12, 12);
	t.pop();

	t.push();
	t.charColor(255, 225, 140);
	t.char('+');
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const statusColor = isVisible ? [140, 255, 180] : [255, 100, 100];

	drawText('TEXTMODELAYER.SHOW', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: SHOW HIDDEN LAYER', x, y++, [100, 220, 255]);
	drawText('show() restores compositing.', x, y++, [140, 160, 190]);
	drawText('hide() pauses visible output.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(isVisible ? 'LAYER: VISIBLE' : 'LAYER: HIDDEN', x, y++, statusColor);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
