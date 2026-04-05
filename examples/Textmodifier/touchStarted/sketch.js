/**
 * @title Textmodifier.touchStarted
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

const ripples = [];

t.touchStarted((data) => {
	ripples.push({
		x: data.touch.x,
		y: data.touch.y,
		r: Math.random() * 255,
		g: Math.random() * 255,
		b: Math.random() * 255,
		startFrame: t.frameCount,
	});
});

t.draw(() => {
	t.background(0);

	for (let i = ripples.length - 1; i >= 0; i--) {
		const ripple = ripples[i];
		const age = t.frameCount - ripple.startFrame;
		const size = age * 0.5;
		const alpha = Math.max(0, 255 - age * 4);

		if (alpha <= 0) {
			ripples.splice(i, 1);
			continue;
		}

		t.push();
		t.translate(ripple.x, ripple.y);
		t.char('O');
		t.charColor(ripple.r, ripple.g, ripple.b, alpha);
		t.ellipse(size, size);
		t.pop();
	}
});
