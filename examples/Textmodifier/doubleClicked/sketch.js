/**
 * @title Textmodifier.doubleClicked
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const bursts = [];

t.doubleClicked((data) => {
	if (data.position.x === Number.NEGATIVE_INFINITY) return;

	for (let i = 0; i < 16; i++) {
		const angle = (Math.PI * 2 * i) / 16;
		bursts.push({
			x: data.position.x,
			y: data.position.y,
			vx: Math.cos(angle) * 0.8,
			vy: Math.sin(angle) * 0.8,
			life: 1,
		});
	}
});

t.draw(() => {
	t.background(0);

	for (let i = bursts.length - 1; i >= 0; i--) {
		const burst = bursts[i];
		burst.x += burst.vx;
		burst.y += burst.vy;
		burst.life -= 0.02;

		if (burst.life <= 0) {
			bursts.splice(i, 1);
			continue;
		}

		t.push();
		t.translate(burst.x, burst.y);
		t.char(['*', '+', '·'][i % 3]);
		t.charColor(255, 180 + burst.life * 75, 80, burst.life * 255);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
