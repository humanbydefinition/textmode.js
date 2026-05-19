/**
 * @title Textmodifier.touchEnded
 * @description ASCII firework launcher: releasing a touch or mouse click triggers vibrant, gravity-affected particle explosions that shoot outward in colorful neon sparks.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const sparks = [];

t.touchEnded((data) => {
	explode(data.touch.x, data.touch.y);
});

// Interactive mouse fallback for desktop browsers
t.mouseReleased(() => {
	if (t.mouse) {
		explode(t.mouse.x, t.mouse.y);
	}
});

function explode(x, y) {
	const sparkCount = 24 + Math.floor(Math.random() * 16);
	const baseColor = [Math.floor(120 + Math.random() * 135), Math.floor(120 + Math.random() * 135), 255];

	for (let i = 0; i < sparkCount; i++) {
		const angle = Math.random() * Math.PI * 2;
		const speed = 0.5 + Math.random() * 1.5;
		sparks.push({
			x: x,
			y: y,
			vx: Math.cos(angle) * speed * 1.5,
			vy: Math.sin(angle) * speed - 0.2, // Shoot slightly upward initial impulse
			char: ['*', 'o', '+', '·', '°'][Math.floor(Math.random() * 5)],
			color: baseColor,
			alpha: 255,
			size: 1 + Math.random() * 2,
		});
	}
}

function drawText(text, x, y, r = 180, g = r, b = r) {
	t.push();
	t.translate(x - Math.floor(text.length / 2), y);
	t.charColor(r, g, b);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.draw(() => {
	t.background(6, 8, 14);

	const cols = t.grid.cols;
	const rows = t.grid.rows;

	// Telemetry instruction labels
	drawText('CELESTIAL FIREWORK LAUNCHER', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText(
		'Tap or drag-and-release anywhere on screen to detonate sparks',
		0,
		-Math.floor(rows / 2) + 6,
		120,
		140,
		160
	);

	// Update and draw active firework sparks
	for (let i = sparks.length - 1; i >= 0; i--) {
		const s = sparks[i];
		s.vy += 0.04; // Gravity drift
		s.x += s.vx;
		s.y += s.vy;

		s.alpha -= 3.5; // Easing fade out
		if (s.alpha <= 0) {
			sparks.splice(i, 1);
			continue;
		}

		t.push();
		t.translate(s.x, s.y);
		t.char(s.char);
		// Random sparkling flicker
		const flicker = Math.random() > 0.3 ? s.alpha : s.alpha * 0.4;
		t.charColor(s.color[0], s.color[1], s.color[2], flicker);
		t.rect(s.size, s.size);
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
