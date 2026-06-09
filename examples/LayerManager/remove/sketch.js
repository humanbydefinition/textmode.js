/**
 * @title LayerManager.remove
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const echoes = [];
const labelLayer = t.layers.add();
let idCounter = 0;

function spawnEcho() {
	const id = ++idCounter;
	const layer = t.layers.add();
	const color = [255, 120 + (id % 2) * 135, 80 + (id % 3) * 85];
	layer.draw(() => {
		t.clear();
		drawText(String(id), -Math.floor(String(id).length / 2), 10, color);
	});

	echoes.push({ id, layer, born: t.frameCount });
	t.layers.move(labelLayer, Number.MAX_SAFE_INTEGER);
}

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

t.setup(() => {
	spawnEcho();
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;
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

	if (t.frameCount % 30 === 0 && echoes.length < 5) {
		spawnEcho();
	}

	for (let i = echoes.length - 1; i >= 0; i--) {
		const echo = echoes[i];
		const age = t.frameCount - echo.born;

		echo.layer.opacity(Math.max(0, 1 - age * 0.015));

		if (age >= 66) {
			t.layers.remove(echo.layer);
			echoes.splice(i, 1);
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('LAYERMANAGER.REMOVE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: REMOVE LAYERS', x, y++, [100, 220, 255]);
	drawText('Echo layers fade, then dispose.', x, y++, [140, 160, 190]);
	drawText('New echoes move HUD back on top.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`ACTIVE ECHOES: ${echoes.length}`, x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
