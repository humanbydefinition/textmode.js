/**
 * @title Textmodifier.mouseClicked
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const echoes = [];

t.mouseClicked((data) => {
	if (data.position.x === Number.NEGATIVE_INFINITY) return;
	echoes.push({ x: data.position.x, y: data.position.y, age: 0 });
});

t.draw(() => {
	t.background(0);

	for (let i = 0; i < echoes.length; i++) {
		const echo = echoes[i];
		echo.age += 1;
		const maxAge = 60;

		if (echo.age > maxAge) {
			echoes.splice(i, 1);
			continue;
		}

		t.push();
		t.translate(echo.x, echo.y);

		const progress = echo.age / maxAge;
		const radius = progress * 30;
		const alpha = 255 * (1 - progress);

		t.charColor(100, 200, 255, alpha);
		t.char('○');
		t.ellipse(radius, radius);

		if (progress > 0.2) {
			t.charColor(50, 100, 255, alpha * 0.5);
			t.char('·');
			t.ellipse(radius * 0.6, radius * 0.6);
		}

		t.pop();
	}

	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		t.push();
		t.translate(t.mouse.x, t.mouse.y);
		t.char('+');
		t.charColor(255);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
