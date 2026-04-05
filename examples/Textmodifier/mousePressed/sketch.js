/**
 * @title Textmodifier.mousePressed
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let isPressing = false;
const particles = [];

t.mousePressed(() => {
	isPressing = true;
});

t.mouseReleased(() => {
	isPressing = false;
});

t.draw(() => {
	t.background(0);

	if (isPressing && t.mouse.x !== Number.NEGATIVE_INFINITY) {
		for (let i = 0; i < 5; i++) {
			const angle = Math.random() * Math.PI * 2;
			const speed = Math.random() * 0.5 + 0.2;

			particles.push({
				x: t.mouse.x,
				y: t.mouse.y,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				life: 1.0,
			});
		}
	}

	for (let i = particles.length - 1; i >= 0; i--) {
		const particle = particles[i];
		particle.x += particle.vx;
		particle.y += particle.vy;
		particle.life -= 0.02;

		if (particle.life <= 0) {
			particles.splice(i, 1);
			continue;
		}

		t.push();
		t.translate(particle.x, particle.y);
		const chars = ['.', 'o', '*', '@'];
		t.char(chars[Math.floor(particle.life * 3.99)]);
		t.charColor(255, particle.life * 255, 100);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
