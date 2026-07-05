/**
 * @title LayerManager.base
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const base = t.layers.base;
const overlay = t.layers.add({ blendMode: 'screen', opacity: 0.8 });
const labelLayer = t.layers.add();

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	drawText(text, -Math.floor(text.length / 2), y, rgb);
}

base.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;

	drawCenteredText('Base Layer', -4, [240, 245, 255]);

	for (let i = 0; i < 4; i++) {
		const angle = time * 0.5 + (i / 4) * Math.PI * 2;
		const x = Math.round(Math.cos(angle) * 5 * 1.7);
		const y = Math.round(Math.sin(angle) * 5);

		t.push();
		t.translate(x, y);
		t.charColor(70 + i * 20, 160, 255);
		t.char('o');
		t.point();
		t.pop();
	}
});

overlay.draw(() => {
	t.clear();

	const time = t.frameCount * 0.02;

	drawCenteredText('Overlay', 4, [120, 255, 180]);

	const x = Math.round(Math.cos(time * 1.5) * 3 * 1.7);
	const y = Math.round(Math.sin(time * 1.5) * 3);

	t.push();
	t.translate(x, y);
	t.charColor(255, 200, 100);
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

	drawText('LAYERMANAGER.BASE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: ACCESS BASE LAYER', x, y++, [100, 220, 255]);
	drawText('Base draws below user layers.', x, y++, [140, 160, 190]);
	drawText('Overlay proves stack compositing.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`OV OP: ${overlay.opacity().toFixed(1)}`, x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
