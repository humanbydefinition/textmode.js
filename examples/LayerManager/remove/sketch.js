/**
 * @title LayerManager.remove
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

const echoes = [];

function spawnEcho() {
	const angle = Math.random() * Math.PI * 2;
	const distance = Math.min(t.grid.cols, t.grid.rows) * (0.08 + Math.random() * 0.2);
	const echo = {
		born: t.frameCount,
		x: Math.cos(angle) * distance,
		y: Math.sin(angle) * distance * 0.6,
		char: ['·', '+', '*', '░'][echoes.length % 4],
		layer: t.layers.add({ blendMode: 'additive', opacity: 0.9 }),
	};

	echo.layer.draw(() => {
		t.clear();

		const age = t.frameCount - echo.born;
		const size = 4 + age * 0.45;

		t.push();
		t.translate(echo.x, echo.y);
		t.rotateZ(age * 3);
		t.lineWeight(1 + (age % 20 < 10 ? 1 : 0));
		t.char(echo.char);
		t.charColor(120 + age, 170 + age * 0.5, 255);
		t.arc(size, size * 0.65, age * 7, age * 7 + 240);
		t.pop();
	});

	echoes.push(echo);
}

t.draw(() => {
	const time = t.frameCount * 0.02;
	const radius = Math.min(t.grid.cols, t.grid.rows) * 0.38;

	t.background(4, 10, 18);

	for (let i = 1; i <= 5; i++) {
		const size = (radius * i) / 2.5;
		t.charColor(20, 50 + i * 18, 80 + i * 12);
		t.char(i % 2 ? '.' : ':');
		t.ellipse(size * 2, size * 2);
	}

	for (let i = 0; i < 3; i++) {
		t.push();
		t.rotateZ(time * (35 + i * 20));
		t.charColor(120 + i * 30, 220, 255);
		t.char('/');
		t.lineWeight(2);
		t.line(0, 0, radius, 0);
		t.pop();
	}

	t.charColor(255, 240, 180);
	t.char('◉');
	t.point();

	if (t.frameCount % 18 === 0) {
		spawnEcho();
	}

	for (let i = echoes.length - 1; i >= 0; i--) {
		const echo = echoes[i];
		const age = t.frameCount - echo.born;
		const life = 96;
		const opacity = Math.max(0, 1 - age / life);

		echo.layer.opacity(opacity * 0.9);

		if (age >= life) {
			t.layers.remove(echo.layer);
			echoes.splice(i, 1);
		}
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
