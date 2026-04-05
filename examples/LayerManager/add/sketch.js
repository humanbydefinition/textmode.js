/**
 * @title LayerManager.add
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const cloudLayer = t.layers.add({ blendMode: 'screen', opacity: 0.45 });
const rainLayer = t.layers.add({ blendMode: 'additive', opacity: 0.7, fontSize: 8 });
const signalLayer = t.layers.add({ blendMode: 'difference', opacity: 0.3 });

t.draw(() => {
	const time = t.frameCount * 0.02;
	const radius = Math.min(t.grid.cols, t.grid.rows) * 0.42;

	t.background(6, 10, 22);

	for (let i = 0; i < 18; i++) {
		const angle = (i / 18) * Math.PI * 2;
		const x = Math.cos(angle + time * 0.3) * radius;
		const y = Math.sin(angle * 2 + time) * radius * 0.35;

		t.charColor(40, 80 + i * 5, 120 + i * 7);
		t.char(['·', ':', '+'][i % 3]);
		t.line(-x, -y, x, y);
	}

	t.push();
	t.rotateZ(-time * 30);
	t.charColor(255, 220, 140);
	t.char('*');
	t.arc(radius * 0.9, radius * 0.9, time * 90, time * 90 + 260);
	t.pop();
});

cloudLayer.draw(() => {
	t.clear();

	const time = t.frameCount * 0.02;

	for (let i = 0; i < 14; i++) {
		t.push();
		t.translate(Math.sin(time * 0.9 + i) * 18, Math.cos(time * 0.6 + i * 1.7) * 7);
		t.rotateZ(time * 15 + i * 20);
		t.char(['░', '▒', '▓'][i % 3]);
		t.charColor(120 + i * 8, 180 + i * 4, 255);
		t.ellipse(10 + i * 0.8, 4 + Math.sin(time + i) * 2);
		t.pop();
	}
});

rainLayer.draw(() => {
	t.clear();

	const time = t.frameCount * 0.04;
	const g = rainLayer.grid;

	for (let x = -g.cols / 2; x < g.cols / 2; x += 3) {
		const speed = 0.6 + Math.abs(Math.sin(x * 0.17)) * 1.5;
		const y = ((time * speed + x * 3) % (g.rows + 12)) - g.rows / 2 - 6;

		t.push();
		t.translate(x, y);
		t.charColor(120, 255, 220);
		t.char('¦');
		t.line(0, 0, 0, 8);
		t.pop();
	}
});

signalLayer.draw(() => {
	t.clear();

	const time = t.frameCount * 0.02;
	const sweepY = Math.sin(time * 2.4) * t.grid.rows * 0.25;

	t.charColor(255, 255, 255);
	t.char('─');
	t.line(-t.grid.cols * 0.45, sweepY, t.grid.cols * 0.45, sweepY);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
