/**
 * @title Textmodifier.mouseDragged
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const trail = [];

t.mouseDragged((data) => {
	if (data.position.x === Number.NEGATIVE_INFINITY) return;

	trail.push({
		x: data.position.x,
		y: data.position.y,
		life: 1,
		char: ['#', '@', '*'][Math.floor(Math.random() * 3)],
	});
});

t.draw(() => {
	t.background(0);

	for (let i = trail.length - 1; i >= 0; i--) {
		const point = trail[i];
		point.life -= 0.02;

		if (point.life <= 0) {
			trail.splice(i, 1);
			continue;
		}

		t.push();
		t.translate(point.x, point.y);
		t.char(point.char);
		t.charColor(255, 160 + point.life * 95, 80);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
