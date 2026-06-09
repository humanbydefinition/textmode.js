/**
 * @title TextmodeLayer.opacity
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const pulseLayer = t.layers.add({ blendMode: 'additive' });
const labelLayer = t.layers.add();
let currentOpacity = 1;

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

function drawMeter(value, x, y, rgb) {
	const width = 20;
	const activeBlocks = Math.round(value * width);

	t.push();
	t.translate(x, y);
	for (let i = 0; i < width; i++) {
		const active = i < activeBlocks;
		const color = active ? rgb : [60, 70, 100];
		t.push();
		t.translate(i, 0);
		t.char(active ? '|' : '.');
		t.charColor(color[0], color[1], color[2]);
		t.point();
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.04;
	const opacity = 0.5 + 0.5 * Math.sin(time);

	currentOpacity = opacity;
	pulseLayer.opacity(opacity);

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();
});

pulseLayer.draw(() => {
	t.clear();

	t.push();
	t.charColor(255, 140, 180);
	t.char('#');
	t.rect(12, 6);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODELAYER.OPACITY', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: LAYER ALPHA', x, y++, [100, 220, 255]);
	drawText('Pulse layer fades in and out.', x, y++, [140, 160, 190]);
	drawText('Opacity is clamped from 0 to 1.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawMeter(currentOpacity, x, y++, [255, 225, 140]);
	drawText(`OPACITY: ${currentOpacity.toFixed(2)}`, x, y++, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
