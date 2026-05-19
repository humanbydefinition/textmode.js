/**
 * @title Textmodifier.tap
 * @description Concentric ripple generator: tapping or clicking spawns beautiful expanding ASCII water waves with fading colors and customizable wave characters.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const ripples = [];

t.tap((data) => {
	spawnRipple(data.touch.x, data.touch.y);
});

// Interactive mouse fallback for desktop browsers
t.mousePressed(() => {
	if (t.mouse) {
		spawnRipple(t.mouse.x, t.mouse.y);
	}
});

function spawnRipple(x, y) {
	// Create a new pulsing concentric wave
	ripples.push({
		x: x,
		y: y,
		radius: 0,
		maxRadius: 15 + Math.random() * 15,
		color: [Math.floor(100 + Math.random() * 155), Math.floor(150 + Math.random() * 105), 255],
		alpha: 255,
	});
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

	// Draw diagnostic header details
	drawText('CONCENTRIC RIPPLE EXPLORER', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText(
		'Tap anywhere on the screen or click with mouse to trigger waves',
		0,
		-Math.floor(rows / 2) + 6,
		120,
		140,
		160
	);

	// Update and render all active concentric ripples
	for (let idx = ripples.length - 1; idx >= 0; idx--) {
		const r = ripples[idx];
		r.radius += 0.45; // Wave expanding speed

		// Fade out as it expands
		const ageRatio = r.radius / r.maxRadius;
		r.alpha = Math.max(0, 255 * (1.0 - ageRatio));

		if (r.alpha <= 0 || r.radius >= r.maxRadius) {
			ripples.splice(idx, 1);
			continue;
		}

		// Draw concentric rings using circle drawing points
		const steps = Math.floor(8 + r.radius * 3.5);
		for (let s = 0; s < steps; s++) {
			const angle = (s / steps) * Math.PI * 2;
			const rx = Math.cos(angle) * r.radius * 1.5;
			const ry = Math.sin(angle) * r.radius;

			t.push();
			t.translate(r.x + rx, r.y + ry);

			// Dynamic wave characters based on ripple age/radius
			const waveChars = ['☼', 'O', 'o', '°', '·'];
			const charIdx = Math.floor(ageRatio * waveChars.length) % waveChars.length;
			t.char(waveChars[charIdx]);

			t.charColor(r.color[0], r.color[1], r.color[2], r.alpha);
			t.point();
			t.pop();
		}
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
