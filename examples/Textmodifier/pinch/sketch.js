/**
 * @title Textmodifier.pinch
 * @description Gestural scaling: zoom and rotate an intricate glowing ASCII geometric mandala using mobile touch pinch gestures or desktop mouse scroll wheels.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let targetScale = 1.0;
let currentScale = 1.0;

t.pinch((data) => {
	targetScale = Math.max(0.2, Math.min(5.0, data.scale));
});

// Fallback scroll wheel support for desktop browsers
window.addEventListener(
	'wheel',
	(e) => {
		targetScale = Math.max(0.2, Math.min(5.0, targetScale - e.deltaY * 0.0015));
	},
	{ passive: true }
);

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

	// Easing for super smooth zooming transitions
	currentScale += (targetScale - currentScale) * 0.1;

	// Draw instructions
	drawText('MANDALA PINCH & SCROLL VIEWER', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText('Pinch on touchpads or use mouse scroll wheel to scale', 0, -Math.floor(rows / 2) + 6, 120, 140, 160);
	drawText(`SCALE: ${currentScale.toFixed(2)}x`, 0, Math.floor(rows / 2) - 4, 255, 220, 100);

	// Render the complex concentric geometric mandala
	t.push();
	t.rotateZ(t.frameCount * 0.5 + currentScale * 30); // Rotate based on frame and zoom level

	const rings = 8;
	for (let ring = 1; ring <= rings; ring++) {
		const points = 6 + ring * 4;
		const r = ring * 3 * currentScale;

		for (let i = 0; i < points; i++) {
			const angle = (i / points) * Math.PI * 2 + ring * 0.1;
			const px = Math.cos(angle) * r * 1.5;
			const py = Math.sin(angle) * r;

			t.push();
			t.translate(px, py);

			// Choose character based on ring layer
			const chars = ['·', 'o', '*', '+', 'X', '☼', '▒', '█'];
			const charSym = chars[(ring - 1) % chars.length];
			t.char(charSym);

			// Dynamic rainbow/gold gradients
			const hueR = Math.floor(130 + 125 * Math.sin(angle + currentScale));
			const hueG = Math.floor(180 + 75 * Math.cos(angle * 2));
			const hueB = Math.floor(255 - ring * 20);
			t.charColor(hueR, hueG, hueB);

			t.point();
			t.pop();
		}
	}

	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
