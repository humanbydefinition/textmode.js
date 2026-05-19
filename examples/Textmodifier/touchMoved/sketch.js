/**
 * @title Textmodifier.touchMoved
 * @description Neon Fluid Touch Brush: paints organic glowing neon trails that expand, animate, and fade in real-time as the user drags their finger across the touch screen or moves their mouse with click-drag fallbacks.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const trail = [];
const MAX_TRAIL = 40;

t.touchMoved((data) => {
	const { touch } = data;
	trail.push({ x: touch.x, y: touch.y, age: 0 });
	if (trail.length > MAX_TRAIL) trail.shift();
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

	// Draw informative title
	drawText('NEON FLUID TOUCH PAINTBRUSH', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText(
		'Drag finger or click-and-drag mouse to paint glowing neon vectors',
		0,
		-Math.floor(rows / 2) + 6,
		120,
		140,
		160
	);

	// Desktop mouse drawing fallback
	if (t.mouse && t.mouseIsPressed) {
		trail.push({ x: t.mouse.x, y: t.mouse.y, age: 0 });
		if (trail.length > MAX_TRAIL) trail.shift();
	}

	// Update ages and draw trail paths
	for (let i = 0; i < trail.length; i++) {
		const node = trail[i];
		node.age++;

		const ratio = i / trail.length;
		const fade = Math.max(0, 1.0 - node.age / 120);

		if (fade <= 0) continue;

		t.push();
		t.translate(node.x, node.y);

		// Neon color interpolation: Hot pink to Electric cyan
		const r = Math.floor((255 * ratio + 100 * (1 - ratio)) * fade);
		const g = Math.floor((100 * ratio + 255 * (1 - ratio)) * fade);
		const b = Math.floor(255 * fade);

		t.charColor(r, g, b);

		// Size decreases as particle ages
		const size = Math.max(1, Math.floor(5 * ratio * fade));

		// Draw pulsing brush cells
		if (i % 2 === 0) {
			t.char('💮');
		} else {
			t.char('•');
		}

		t.ellipse(size, size);
		t.pop();
	}

	// Draw trail count diagnostic footer
	const sizeStr = `TRAIL_ELEMENTS: ${trail.length} / ${MAX_TRAIL}`;
	drawText(sizeStr, 0, Math.floor(rows / 2) - 4, 100, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
	trail.length = 0;
});
