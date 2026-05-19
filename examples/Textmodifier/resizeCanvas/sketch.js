/**
 * @title Textmodifier.resizeCanvas
 * @description Dynamic Diagnostic Crosshair: displays a cybernetic network telemetry HUD with a glowing central crosshair, active grid dimensions, column/row telemetry, and live animations indicating responsive UI state changes.
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

	// Glowing outer bounding box
	t.push();
	t.charColor(30, 45, 65);
	t.char('█');
	t.ellipse(cols - 4, rows - 4);
	t.pop();

	// Telemetry Labels
	drawText('GRID VIEWPORT TELEMETRY COMPASS', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText(
		'Resize window to test reactive cell grid metrics in real-time',
		0,
		-Math.floor(rows / 2) + 6,
		120,
		140,
		160
	);

	// Central Radar / Crosshair
	t.push();
	t.translate(0, 0);

	// Outer radar ring
	t.push();
	const pulse = 1.0 + Math.sin(t.frameCount * 0.08) * 0.08;
	t.charColor(50, 80, 120);
	t.char('·');
	t.ellipse(24 * pulse, 24 * pulse);
	t.pop();

	// Inner crosshair indicators
	t.push();
	t.charColor(0, 255, 180);
	t.char('+');
	t.point();
	t.pop();

	// Compass Axes Lines
	t.charColor(25, 35, 50);
	t.line(-Math.floor(cols / 2) + 6, 0, Math.floor(cols / 2) - 6, 0);
	t.line(0, -Math.floor(rows / 2) + 8, 0, Math.floor(rows / 2) - 8);

	t.pop();

	// Digital Telemetry Readings
	const wStr = `CANVAS_WIDTH: ${window.innerWidth} PX`;
	const hStr = `CANVAS_HEIGHT: ${window.innerHeight} PX`;
	const gridStr = `GRID_CELLS: ${cols} COLUMNS x ${rows} ROWS`;

	drawText(wStr, 0, 4, 255, 180, 50);
	drawText(hStr, 0, 6, 255, 180, 50);
	drawText(gridStr, 0, 8, 100, 255, 180);

	// Status signal
	const blink = Math.round(150 + 105 * Math.sin(t.frameCount * 0.12));
	drawText('STATUS: ONLINE // GRID COMPILER SYNC ACTIVE', 0, Math.floor(rows / 2) - 5, 0, blink, blink * 0.8);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
