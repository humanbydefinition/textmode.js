/**
 * @title Textmodifier.pmouse
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const segments = [];

t.draw(() => {
	t.background(0);

	const mouseInside = t.mouse.x !== Number.NEGATIVE_INFINITY;
	const previousInside = t.pmouse.x !== Number.NEGATIVE_INFINITY;

	if (mouseInside && previousInside) {
		segments.push({
			x1: t.pmouse.x,
			y1: t.pmouse.y,
			x2: t.mouse.x,
			y2: t.mouse.y,
			life: 1,
		});
	}

	for (let i = segments.length - 1; i >= 0; i--) {
		const segment = segments[i];
		segment.life -= 0.03;

		if (segment.life <= 0) {
			segments.splice(i, 1);
			continue;
		}

		t.push();
		t.char('-');
		t.lineWeight(1);
		t.charColor(100, 180 + segment.life * 75, 255, segment.life * 255);
		t.line(segment.x1, segment.y1, segment.x2, segment.y2);
		t.pop();
	}

	if (mouseInside) {
		t.push();
		t.translate(t.mouse.x, t.mouse.y);
		t.char('@');
		t.charColor(255, 220, 120);
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
