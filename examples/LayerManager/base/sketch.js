/**
 * @title LayerManager.base
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

const base = t.layers.base;
const hudLayer = t.layers.add({ blendMode: 'screen', opacity: 0.9 });

base.draw(() => {
	const time = t.frameCount * 0.02;
	const radius = Math.min(t.grid.cols, t.grid.rows) * 0.38;
	const sweepAngle = time * 120;

	t.background(4, 12, 10);

	for (let i = 1; i <= 5; i++) {
		const size = (radius * i) / 2.5;
		t.charColor(20, 70 + i * 20, 35);
		t.char(i % 2 ? '·' : ':');
		t.lineWeight(1);
		t.ellipse(size * 2, size * 2);
	}

	for (let i = 0; i < 8; i++) {
		t.push();
		t.rotateZ(i * 45);
		t.charColor(18, 60, 28);
		t.char('.');
		t.line(0, 0, radius, 0);
		t.pop();
	}

	for (let i = 0; i < 18; i++) {
		const angle = (i / 18) * Math.PI * 2 + Math.sin(time * 0.5 + i) * 0.3;
		const dist = radius * (0.2 + ((i * 37) % 100) / 140);
		const x = Math.cos(angle) * dist;
		const y = Math.sin(angle) * dist;
		const delta = Math.atan2(
			Math.sin(angle - (sweepAngle * Math.PI) / 180),
			Math.cos(angle - (sweepAngle * Math.PI) / 180)
		);
		const glow = Math.max(0, 1 - Math.abs(delta) / 0.8);

		t.push();
		t.translate(x, y);
		t.char(['•', '*', '+'][i % 3]);
		t.charColor(80 + glow * 175, 140 + glow * 115, 90 + glow * 40);
		t.point();
		t.pop();
	}

	for (let i = 0; i < 6; i++) {
		t.push();
		t.rotateZ(sweepAngle - i * 4);
		t.charColor(40 + i * 30, 120 + i * 20, 55);
		t.char('/');
		t.lineWeight(2);
		t.line(0, 0, radius, 0);
		t.pop();
	}

	t.charColor(220, 255, 180);
	t.char('◉');
	t.point();

	base.filter('threshold', 0.22 + 0.06 * Math.sin(time * 2));
});

hudLayer.draw(() => {
	t.clear();

	const time = t.frameCount * 0.02;
	const scanY = Math.sin(time * 2) * Math.min(t.grid.rows * 0.3, 12);

	t.charColor(90, 255, 170);
	t.char('═');
	t.rect(t.grid.cols * 0.82, t.grid.rows * 0.82);

	t.charColor(120, 255, 200);
	t.char('─');
	t.line(-t.grid.cols * 0.35, scanY, t.grid.cols * 0.35, scanY);

	t.char('│');
	t.line(0, -t.grid.rows * 0.35, 0, t.grid.rows * 0.35);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
