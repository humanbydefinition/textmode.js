/**
 * @title Textmodifier.millis3
 * @description Time telemetry dashboard: circular radar sweep, linear time bar, and precise time clocks powered by t.millis, allowing manual resets.
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

t.keyPressed((data) => {
	if (data.key === ' ') {
		t.millis = 0; // Directly mutates and resets the time state of the sketch
	}
});

t.draw(() => {
	t.background(6, 8, 14);

	const elapsed = t.millis;
	const secs = elapsed / 1000;
	const minutes = Math.floor(secs / 60);
	const displaySecs = (secs % 60).toFixed(3);

	const cols = t.grid.cols;
	const rows = t.grid.rows;

	// 1. Digital Telemetry Clock HUD
	drawText('CHRONOMETRY TIME SENSOR', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText('PRESS [SPACEBAR] TO RESET TIME STATE', 0, -Math.floor(rows / 2) + 6, 120, 140, 160);

	const clockStr = `${minutes.toString().padStart(2, '0')}:${displaySecs.padStart(6, '0')}s`;
	drawText(clockStr, 0, -4, 255, 230, 120);
	drawText(`${elapsed.toFixed(0)} ms`, 0, -2, 180, 180, 200);

	// 2. Circular Radar Sweep
	// Complete 360-degree sweep every 3 seconds
	const duration = 3000;
	const progress = (elapsed % duration) / duration;
	const angle = progress * Math.PI * 2;

	t.push();
	t.translate(0, 3);
	const radarDots = 20;
	for (let i = 0; i < radarDots; i++) {
		const stepAngle = (i / radarDots) * Math.PI * 2;
		const r = 6;
		const px = Math.cos(stepAngle) * r * 1.6;
		const py = Math.sin(stepAngle) * r;

		t.push();
		t.translate(px, py);
		t.char(i % 2 === 0 ? '·' : 'o');

		// Fade out dots depending on their angular distance behind the current sweep hand
		let diff = angle - stepAngle;
		if (diff < 0) diff += Math.PI * 2;
		const intensity = Math.max(0.15, 1.0 - diff / (Math.PI * 2));

		t.charColor(Math.floor(100 * intensity), Math.floor(255 * intensity), Math.floor(150 * intensity));
		t.point();
		t.pop();
	}

	// Active sweep line hand
	const hx = Math.cos(angle) * 9.6;
	const hy = Math.sin(angle) * 6;
	t.push();
	t.charColor(100, 255, 180);
	t.char('▲');
	t.translate(hx, hy);
	t.rect(1.5, 1.5);
	t.pop();
	t.pop();

	// 3. Linear progress wave running across the bottom
	const margin = 8;
	const barWidth = cols - margin * 2;
	const fillWidth = barWidth * progress;

	t.push();
	t.translate(0, Math.floor(rows / 2) - 5);

	// Background track
	t.charColor(40, 45, 55);
	t.char('▒');
	t.push();
	t.translate(-barWidth / 2 + barWidth / 2, 0);
	t.rect(barWidth, 2);
	t.pop();

	// Energy filler
	t.charColor(100, 200, 255);
	t.char('█');
	t.push();
	t.translate(-barWidth / 2 + fillWidth / 2, 0);
	t.rect(fillWidth, 2);
	t.pop();

	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
