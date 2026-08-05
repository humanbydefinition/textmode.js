/**
 * @title LayerManager.move
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

const layer1 = t.layers.add();
const layer2 = t.layers.add({ blendMode: t.BLEND_SCREEN, opacity: 0.55 });
const layer3 = t.layers.add({ blendMode: t.BLEND_ADDITIVE, opacity: 0.4 });
const labelLayer = t.layers.add();

layer1.draw(() => {
	t.clear();

	for (let y = -(t.grid.rows >> 1); y <= t.grid.rows >> 1; y++) {
		for (let x = -(t.grid.cols >> 1); x <= t.grid.cols >> 1; x++) {
			const v = Math.sin(x * 0.12 + t.frameCount * 0.02) * Math.cos(y * 0.14 + t.frameCount * 0.014);
			if (Math.abs(v) < 0.12) continue;

			t.push();
			t.translate(x, y);
			t.charColor(180 + v * 75, 80 + v * 80, 20 + v * 40);
			t.char(v > 0.5 ? '@' : v > 0.25 ? '+' : '.');
			t.point();
			t.pop();
		}
	}
});

layer2.draw(() => {
	t.clear();

	for (let y = -(t.grid.rows >> 1); y <= t.grid.rows >> 1; y++) {
		for (let x = -(t.grid.cols >> 1); x <= t.grid.cols >> 1; x++) {
			const v = Math.sin((x + y) * 0.11 + t.frameCount * 0.022) * Math.sin((x - y) * 0.11 + t.frameCount * 0.016);
			if (Math.abs(v) < 0.1) continue;

			t.push();
			t.translate(x, y);
			t.charColor(40 + v * 60, 160 + v * 95, 120 + v * 55);
			t.char(v > 0.5 ? '@' : v > 0.25 ? '+' : '.');
			t.point();
			t.pop();
		}
	}
});

layer3.draw(() => {
	t.clear();

	for (let y = -(t.grid.rows >> 1); y <= t.grid.rows >> 1; y++) {
		for (let x = -(t.grid.cols >> 1); x <= t.grid.cols >> 1; x++) {
			const d = Math.sqrt(x * x * 0.9 + y * y) * 0.16;
			const v = Math.sin(d - t.frameCount * 0.025) / (d * 0.2 + 1);
			if (v < 0.08) continue;

			t.push();
			t.translate(x, y);
			t.charColor(120 + v * 100, 50 + v * 60, 200 + v * 55);
			t.char(v > 0.4 ? '@' : v > 0.2 ? '+' : '.');
			t.point();
			t.pop();
		}
	}
});

t.draw(() => {
	t.background(6, 10, 22);
	if (t.frameCount % 75 === 0 && t.layers.all.length > 2) t.layers.move(t.layers.all[0], t.layers.all.length - 2);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;

	drawText('LAYERMANAGER.MOVE', left + 3, y++, [100, 255, 140]);
	drawText('CONCEPT: MOVE LAYER INDEX', left + 3, y++, [100, 220, 255]);
	drawText('nrml / screen 0.55 / add 0.4', left + 3, y++, [140, 190, 255]);
	drawText('Bottom layer rotates to the top.', left + 3, y++, [140, 160, 190]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
