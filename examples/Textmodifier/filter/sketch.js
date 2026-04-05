/**
 * @title Textmodifier.filter
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
	t.background(0);

	const time = t.frameCount * 0.02;
	const count = 12;

	for (let i = 0; i < count; i++) {
		const angle = (i / count) * Math.PI * 2 + time;
		const radius = 15 + 5 * Math.sin(time * 3 + i);

		t.push();
		t.translate(Math.cos(angle) * radius, Math.sin(angle) * radius);
		t.rotateZ(angle * 50);
		t.charColor(127 + 127 * Math.sin(i), 127 + 127 * Math.cos(i), 200);
		t.char(['@', '%', '#', '*'][i % 4]);
		t.rect(12, 12);
		t.pop();
	}

	const threshold = 0.4 + 0.2 * Math.sin(time * 2);
	t.filter('threshold', threshold);

	if (Math.floor(time) % 2 === 0) {
		t.filter('invert');
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
