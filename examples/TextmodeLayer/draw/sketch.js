/**
 * @title TextmodeLayer.draw
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const backLayer = t.layers.add({ opacity: 0.6 });
const effectLayer = t.layers.add({ blendMode: 'additive' });
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
	t.charColor(40, 50, 80);
	t.char('.');
	for (let y = -4; y <= 4; y += 2) {
		t.push();
		t.translate(0, y);
		t.rect(t.grid.cols, 1);
		t.pop();
	}
	t.pop();
});

backLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.03;

	// Floating data nodes circling the center
	for (let i = 0; i < 6; i++) {
		const angle = time + (i / 6) * Math.PI * 2;
		const r = 10;
		t.push();
		t.translate(Math.round(Math.cos(angle) * r * 1.5), Math.round(Math.sin(angle) * r * 0.6));
		t.charColor(100, 150, 255);
		t.char('o');
		t.point();
		t.pop();
	}
});

effectLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.05;
	const pulse = 0.5 + 0.5 * Math.sin(time);

	// Central core pulsing shape
	t.push();
	t.charColor(255, 100 + pulse * 155, 100);
	t.char('#');
	t.rect(8, 4);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODELAYER.DRAW', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: LAYER DRAW CALLBACK', x, y++, [100, 220, 255]);
	drawText('Base, back, and effect draw apart.', x, y++, [140, 160, 190]);
	drawText('Each callback owns its buffer.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('LAYERS: BASE + 2', x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
