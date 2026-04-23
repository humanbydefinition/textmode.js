/**
 * @title Textmodifier.mouseIsPressed
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const sparks = [];

t.draw(() => {
	t.background(0);

	if (t.mouseIsPressed && t.mouse.x !== Number.NEGATIVE_INFINITY) {
		for (let i = 0; i < 3; i++) {
			sparks.push({
				x: t.mouse.x + (Math.random() - 0.5) * 2,
				y: t.mouse.y + (Math.random() - 0.5) * 2,
				vx: (Math.random() - 0.5) * 0.6,
				vy: (Math.random() - 0.5) * 0.6,
				life: 1,
			});
		}
	}

	for (let i = sparks.length - 1; i >= 0; i--) {
		const spark = sparks[i];
		spark.x += spark.vx;
		spark.y += spark.vy;
		spark.life -= 0.025;

		if (spark.life <= 0) {
			sparks.splice(i, 1);
			continue;
		}

		t.push();
		t.translate(spark.x, spark.y);
		t.char(t.mouseIsPressed ? '*' : '.');
		t.charColor(255, 140 + spark.life * 115, 80, spark.life * 255);
		t.point();
		t.pop();
	}

	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		t.push();
		t.translate(t.mouse.x, t.mouse.y);
		t.char(t.mouseIsPressed ? '@' : '+');
		t.charColor(t.mouseIsPressed ? 255 : 180, t.mouseIsPressed ? 220 : 180, 120);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
