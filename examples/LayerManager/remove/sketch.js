/**
 * @title LayerManager.remove
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const echoes = [];
let idCounter = 0;

function spawnEcho() {
	const id = ++idCounter;
	const layer = t.layers.add();
	const color = [255, 120 + (id % 2) * 135, 80 + (id % 3) * 85];

	layer.draw(() => {
		t.clear();
		t.push();
		t.translate(0, 10);
		t.charColor(color[0], color[1], color[2]);

		const label = String(id);
		for (let i = 0; i < label.length; i++) {
			t.push();
			t.translate(i - Math.floor(label.length / 2), 0);
			t.char(label[i]);
			t.point();
			t.pop();
		}
		t.pop();
	});

	echoes.push({ id, layer, born: t.frameCount });
}

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.setup(() => {
	spawnEcho();
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;

	drawCenteredText('Base Layer', 0, [240, 245, 255]);

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

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
