/**
 * @title LayerManager.swap
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const warmLayer = t.layers.add();
const coolLayer = t.layers.add();
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

warmLayer.draw(() => {
	t.clear();
	drawCenteredText('Warm', 0, [255, 120, 80]);
});

coolLayer.draw(() => {
	t.clear();
	drawCenteredText('Cool', 0, [80, 180, 255]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;

	drawCenteredText('Base Layer', -8, [240, 245, 255]);

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

	if (t.frameCount % 90 === 0) {
		t.layers.swap(warmLayer, coolLayer);
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const warmOnTop = Math.floor(t.frameCount / 90) % 2 === 1;

	drawText('LAYERMANAGER.SWAP', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: SWAP TWO LAYERS', x, y++, [100, 220, 255]);
	drawText('Warm and cool layers trade order.', x, y++, [140, 160, 190]);
	drawText('HUD remains last in the stack.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(warmOnTop ? 'TOP DEMO: WARM' : 'TOP DEMO: COOL', x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
