/**
 * @title Textmodifier.mouseScrolled
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

const rings = [];

t.mouseScrolled((data) => {
	if (data.position.x === Number.NEGATIVE_INFINITY) return;

	const scrollSpeed = 2;
	const intensity = Math.min(scrollSpeed * 30, 255);
	const scrollDown = (data.delta?.y || 0) > 0;

	rings.push({
		x: data.position.x,
		y: data.position.y,
		radius: 1,
		maxRadius: 5 + scrollSpeed * 0.5,
		color: intensity,
		scrollDown,
		age: 0,
		maxAge: 20,
	});
});

t.draw(() => {
	t.background(0);

	for (let i = rings.length - 1; i >= 0; i--) {
		const ring = rings[i];
		ring.age += 1;
		ring.radius += (ring.maxRadius - ring.radius) * 0.15;

		if (ring.age >= ring.maxAge) {
			rings.splice(i, 1);
			continue;
		}

		const life = 1 - ring.age / ring.maxAge;
		const brightness = Math.round(ring.color * life);

		t.push();

		if (ring.scrollDown) {
			t.charColor(brightness * 0.5, brightness * 0.8, 255);
		} else {
			t.charColor(255, brightness * 0.6, brightness * 0.3);
		}

		t.translate(ring.x, ring.y);

		for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
			const ox = Math.round(Math.cos(angle) * ring.radius);
			const oy = Math.round(Math.sin(angle) * ring.radius);

			t.push();
			t.translate(ox, oy);
			t.char('o');
			t.point();
			t.pop();
		}

		t.pop();
	}
});
