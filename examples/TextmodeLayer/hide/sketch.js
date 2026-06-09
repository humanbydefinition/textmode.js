/**
 * @title TextmodeLayer.hide
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const signalLayer = t.layers.add({ blendMode: 'additive' });
const labelLayer = t.layers.add();
let isVisible = true;

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
			signalLayer.hide();
		} else {
			signalLayer.show();
		}
		isVisible = !isVisible;
	}

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();
});

signalLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.05;

	t.push();
	t.charColor(140, 180, 255);
	t.char('#');
	const size = 6 + Math.sin(time) * 2;
	t.rect(Math.round(size * 1.5), Math.round(size));
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const statusColor = isVisible ? [140, 255, 180] : [255, 100, 100];

	drawText('TEXTMODELAYER.HIDE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: HIDE COMPOSITING', x, y++, [100, 220, 255]);
	drawText('Layer draw keeps running.', x, y++, [140, 160, 190]);
	drawText('Hidden output is not composited.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(isVisible ? 'LAYER: VISIBLE' : 'LAYER: HIDDEN', x, y++, statusColor);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
