/**
 * @title LayerManager.swap
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

const warmLayer = t.layers.add({ blendMode: 'normal', opacity: 1 });
const coolLayer = t.layers.add({ blendMode: 'normal', opacity: 1 });

warmLayer.draw(() => {
	t.clear();

	const time = t.frameCount * 0.02;

	for (let i = 0; i < 10; i++) {
		t.push();
		t.rotateZ(time * 35 + i * 18);
		t.char(['█', '▓', '▒'][i % 3]);
		t.charColor(255, 110 + i * 12, 70 + i * 10);
		t.rect(26 - i * 2, 4 + (i % 3) * 2);
		t.pop();
	}
});

coolLayer.draw(() => {
	t.clear();

	const time = t.frameCount * 0.02;

	for (let i = 0; i < 9; i++) {
		t.push();
		t.rotateZ(-time * 28 - i * 22);
		t.char(['░', '+', '•'][i % 3]);
		t.charColor(80 + i * 12, 190 + i * 6, 255);
		t.ellipse(28 - i * 2.4, 12 - i * 0.9);
		t.pop();
	}
});

t.draw(() => {
	const time = t.frameCount * 0.02;
	const radius = Math.min(t.grid.cols, t.grid.rows) * 0.42;

	t.background(8, 10, 20);

	for (let i = 0; i < 24; i++) {
		const angle = (i / 24) * Math.PI * 2 + time * 0.4;
		t.charColor(20, 55 + i * 4, 90 + i * 5);
		t.char(i % 2 ? '.' : ':');
		t.line(0, 0, Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6);
	}

	if (t.frameCount % 90 === 0) {
		t.layers.swap(warmLayer, coolLayer);
	}

	t.charColor(255, 245, 180);
	t.char(t.frameCount % 180 < 90 ? 'A' : 'B');
	t.point();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
