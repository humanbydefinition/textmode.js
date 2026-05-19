/**
 * @title Textmodifier.touches
 * @description Multi-touch telemetry net: tracks multiple touch coordinates in real-time, displays pressure and location metrics, and draws interactive geometric triangulation lines between active fingers.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

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

	// Telemetry header
	drawText('MULTI-TOUCH HUD GEOMETRY NET', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText(
		'Tap multiple fingers on touchpad or drag mouse to triangulate signals',
		0,
		-Math.floor(rows / 2) + 6,
		120,
		140,
		160
	);

	// Multi-point compilation: supports real multi-touch and desktop mouse drag fallback
	const activePoints = [...t.touches];
	if (activePoints.length === 0 && t.mouse && t.mouseIsPressed) {
		activePoints.push({
			id: 0,
			x: t.mouse.x,
			y: t.mouse.y,
			pressure: 0.75,
		});
	}

	// 1. Draw connecting triangulation lines between all active fingers
	t.charColor(50, 80, 120);
	for (let i = 0; i < activePoints.length; i++) {
		for (let j = i + 1; j < activePoints.length; j++) {
			t.line(activePoints[i].x, activePoints[i].y, activePoints[j].x, activePoints[j].y);
		}
	}

	// 2. Draw rings and detailed coordinate text for each active touch point
	activePoints.forEach((touch, idx) => {
		const id = touch.id ?? idx;
		t.push();
		t.translate(touch.x, touch.y);

		// Dynamic color based on touch ID
		const r = Math.floor(130 + 125 * Math.sin(id * 1.5 + t.frameCount * 0.05));
		const g = Math.floor(180 + 75 * Math.cos(id * 0.8));
		const b = 255;

		const pressure = touch.pressure ?? 0.5;
		const pulse = 1 + Math.sin(t.frameCount * 0.1) * 0.15;
		const radius = 3 + pressure * 10 * pulse;

		// Bounding indicator ring
		t.char('○');
		t.charColor(r, g, b, 180);
		t.ellipse(radius, radius);

		// Core marker character
		t.char('█');
		t.charColor(r, g, b);
		t.rect(1.5, 1.5);
		t.pop();

		// Digital metrics label drawn next to the touch point
		const label = `ID:${id} (${touch.x.toFixed(0)}, ${touch.y.toFixed(0)}) P:${pressure.toFixed(2)}`;
		drawText(label, touch.x, touch.y - radius - 1, r, g, b);
	});

	// Telemetry active stats footer
	const statsStr =
		activePoints.length === 0
			? 'GRID TELEMETRY LINK: WAITING FOR INPUT SIGNALS...'
			: `GRID TELEMETRY LINK: ${activePoints.length} SENSOR SIGNALS ESTABLISHED`;
	drawText(
		statsStr,
		0,
		Math.floor(rows / 2) - 4,
		activePoints.length > 0 ? 100 : 140,
		activePoints.length > 0 ? 255 : 140,
		activePoints.length > 0 ? 180 : 150
	);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
