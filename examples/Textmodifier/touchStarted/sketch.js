/**
 * @title Textmodifier.touchStarted
 * @description Generative galaxy seeder: initial touch or mouse click events seed new expanding, spinning spiral galaxies made of colorful ASCII stars.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const galaxies = [];

t.touchStarted((data) => {
	spawnGalaxy(data.touch.x, data.touch.y);
});

// Interactive mouse fallback for desktop browsers
t.mousePressed(() => {
	if (t.mouse) {
		spawnGalaxy(t.mouse.x, t.mouse.y);
	}
});

function spawnGalaxy(x, y) {
	galaxies.push({
		x: x,
		y: y,
		radius: 0.1,
		maxRadius: 18 + Math.random() * 12,
		speed: 0.05 + Math.random() * 0.05,
		rotSpeed: 0.02 + Math.random() * 0.05,
		angleOffset: Math.random() * Math.PI,
		color: [255, Math.floor(100 + Math.random() * 155), Math.floor(180 + Math.random() * 75)],
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

	// Telemetry hud instructions
	drawText('GENERATIVE CEL-GALAXY SEEDER', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText(
		'Tap anywhere on screen or click to seed new spinning spiral systems',
		0,
		-Math.floor(rows / 2) + 6,
		120,
		140,
		160
	);

	// Update and render active generative galaxies
	for (let idx = galaxies.length - 1; idx >= 0; idx--) {
		const g = galaxies[idx];
		g.radius += g.speed * 6; // Growth rate

		const ageRatio = g.radius / g.maxRadius;
		g.alpha = Math.max(0, 255 * (1.0 - ageRatio));

		if (g.alpha <= 0 || g.radius >= g.maxRadius) {
			galaxies.splice(idx, 1);
			continue;
		}

		t.push();
		t.translate(g.x, g.y);

		// Render a gorgeous 4-arm spiral galaxy structure
		const arms = 4;
		const starsPerArm = 18;
		for (let arm = 0; arm < arms; arm++) {
			const baseAngle = (arm / arms) * Math.PI * 2 + g.angleOffset;

			for (let s = 0; s < starsPerArm; s++) {
				const starRatio = s / starsPerArm;
				// Spiral wrapping physics
				const angle = baseAngle + starRatio * 4.5 + t.frameCount * g.rotSpeed;
				const currentR = starRatio * g.radius;

				const px = Math.cos(angle) * currentR * 1.5;
				const py = Math.sin(angle) * currentR;

				t.push();
				t.translate(px, py);

				// Star character density matching center-to-edge
				const starChars = ['█', '☼', 'O', 'o', '*', '·'];
				const charIdx = Math.floor(starRatio * starChars.length) % starChars.length;
				t.char(starChars[charIdx]);

				// Dynamic core-glow gradient
				t.charColor(
					g.color[0],
					Math.floor(g.color[1] * (1 - starRatio)),
					g.color[2],
					g.alpha * (1 - starRatio * 0.5)
				);
				t.point();
				t.pop();
			}
		}

		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
