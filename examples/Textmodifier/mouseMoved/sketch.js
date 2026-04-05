/**
 * @title Textmodifier.mouseMoved
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const trail = [];
let previous = null;

t.mouseMoved((data) => {
	if (data.position.x === Number.NEGATIVE_INFINITY) return;

	const x = data.position.x;
	const y = data.position.y;
	const dx = previous ? x - previous.x : 0;
	const dy = previous ? y - previous.y : 0;
	previous = { x, y };

	trail.push({
		x,
		y,
		vx: dx * 0.2 + (Math.random() - 0.5),
		vy: dy * 0.2 + (Math.random() - 0.5),
		life: 1.0,
		char: ['+', '*', '.', '·'][Math.floor(Math.random() * 4)],
	});
});

t.draw(() => {
	t.background(0);

	for (let i = trail.length - 1; i >= 0; i--) {
		const particle = trail[i];
		particle.x += particle.vx;
		particle.y += particle.vy;
		particle.life -= 0.02;

		if (particle.life <= 0) {
			trail.splice(i, 1);
			continue;
		}

		t.push();
		t.translate(particle.x, particle.y);
		t.charColor(255 * particle.life, 100 + 155 * (1 - particle.life), 255);
		t.char(particle.char);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
