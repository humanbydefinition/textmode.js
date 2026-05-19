/**
 * @title Textmodifier.modifierState
 * @description Glassmorphic terminal controller: displays illuminated, neon-glowing HUD panels for modifier keys that react in real-time when pressed.
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

function drawPanel(x, y, label, active, themeColors) {
	const borderChar = active ? '█' : '░';
	const status = active ? ' ACTIVE ' : ' INACTIVE';

	const activeR = active ? themeColors.active[0] : themeColors.idle[0];
	const activeG = active ? themeColors.active[1] : themeColors.idle[1];
	const activeB = active ? themeColors.active[2] : themeColors.idle[2];

	t.push();
	t.translate(x, y);

	// Panel glowing container
	t.char(borderChar);
	t.charColor(activeR, activeG, activeB, active ? 255 : 120);
	t.rect(14, 6);

	// Invert character content for the active text label
	drawText(label, 0, -1, active ? 255 : 160, active ? 255 : 160, active ? 255 : 180);
	drawText(status, 0, 1, activeR, activeG, activeB);

	t.pop();
}

t.draw(() => {
	t.background(6, 8, 14);

	const { shift, ctrl, alt, meta } = t.modifierState;
	const activeCount = [shift, ctrl, alt, meta].filter(Boolean).length;

	const cols = t.grid.cols;
	const rows = t.grid.rows;

	// Header JSDoc terminal console title
	drawText('COGNITIVE INTERACTIVE KEYBOARD SENSORS', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText(
		'PRESS AND HOLD MODIFIER KEYS ON YOUR KEYBOARD TO TELEPORT THE SIGNAL',
		0,
		-Math.floor(rows / 2) + 6,
		120,
		140,
		160
	);

	// Color configurations for the 4 key panels
	const themeShift = { active: [255, 100, 100], idle: [60, 40, 40] }; // Red
	const themeCtrl = { active: [255, 200, 50], idle: [60, 55, 30] }; // Yellow
	const themeAlt = { active: [100, 255, 150], idle: [30, 60, 45] }; // Green
	const themeMeta = { active: [100, 180, 255], idle: [30, 45, 60] }; // Cyan

	// Responsive quad layout
	const spacingX = Math.max(12, Math.floor(cols / 4));
	const spacingY = Math.max(6, Math.floor(rows / 4));

	drawPanel(-spacingX, -spacingY, 'SHIFT KEY', shift, themeShift);
	drawPanel(spacingX, -spacingY, 'CTRL KEY', ctrl, themeCtrl);
	drawPanel(-spacingX, spacingY, 'ALT KEY', alt, themeAlt);
	drawPanel(spacingX, spacingY, 'META / CMD', meta, themeMeta);

	// Central visual connection matrix
	t.push();
	const pulse = 1 + Math.sin(t.frameCount * 0.1) * 0.25;
	t.rotateZ(t.frameCount * (1 + activeCount * 2));
	t.char(activeCount > 0 ? '☼' : '·');
	t.charColor(activeCount > 0 ? 255 : 80, activeCount > 0 ? 220 : 90, activeCount > 0 ? 150 : 100);
	t.rect(4 * pulse + activeCount * 4, 4 * pulse + activeCount * 4);
	t.pop();

	// Telemetry stats footer
	const infoStr =
		activeCount === 0
			? 'STATUS: IDLE PORT - WAITING FOR INPUT...'
			: `STATUS: ACTIVE GATEWAY - ${activeCount} KEYS BINDING`;
	drawText(
		infoStr,
		0,
		Math.floor(rows / 2) - 4,
		activeCount > 0 ? 100 : 140,
		activeCount > 0 ? 255 : 140,
		activeCount > 0 ? 180 : 150
	);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
