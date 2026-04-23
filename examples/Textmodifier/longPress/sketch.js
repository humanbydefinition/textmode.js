/**
 * @title Textmodifier.longPress
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const bursts = [];

t.longPress((data) => {
	bursts.push({ x: data.touch.x, y: data.touch.y, life: 0 });
});

t.draw(() => {
	t.background(0);

	for (let i = bursts.length - 1; i >= 0; i--) {
		const burst = bursts[i];
		burst.life += 1;

		t.push();
		t.translate(burst.x, burst.y);
		t.rotateZ(burst.life * 5);

		const size = burst.life * 1.5;
		const alpha = Math.max(0, 255 - burst.life * 4);

		t.char('☼');
		t.charColor(255, 200, 100, alpha);
		t.rect(size, size);
		t.pop();

		if (burst.life > 60) bursts.splice(i, 1);
	}

	if (bursts.length === 0) {
		t.charColor(100);
		t.char('?');
		t.rect(1, 1);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
