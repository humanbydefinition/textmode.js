/**
 * @title Textmodifier.gamepadStandardMapping
 * @description Render semantic labels for a standard-mapped controller: face buttons, d-pad, sticks, shoulders.
 * @author humanbydefinition
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

function drawText(text, x, y, r = 220, g = r, b = r) {
	t.push();
	t.translate(x, y);
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

function drawButton(label, btn, x, y) {
	const on = btn.pressed;
	const r = on ? 255 : 80;
	const g = on ? 255 : 80;
	const b = on ? 100 : 80;
	drawText(label, x, y, r, g, b);

	if (btn.value > 0 && btn.value < 1) {
		drawText(btn.value.toFixed(1), x + label.length + 1, y, 180, 180, 100);
	}
}

function drawStick(label, stick, cx, cy, r, g, b) {
	drawText(label, cx - Math.floor(label.length / 2), cy - 3, 140, 140, 140);

	// Border
	for (let dx = -3; dx <= 3; dx++) {
		drawText('.', cx + dx, cy - 2, 50, 50, 50);
		drawText('.', cx + dx, cy + 2, 50, 50, 50);
	}
	for (let dy = -1; dy <= 1; dy++) {
		drawText('.', cx - 3, cy + dy, 50, 50, 50);
		drawText('.', cx + 3, cy + dy, 50, 50, 50);
	}

	// Cursor
	const px = Math.round(cx + stick.x * 3);
	const py = Math.round(cy + stick.y * 2);

	t.push();
	t.translate(px, py);
	t.char(stick.magnitude > 0 ? '@' : '+');
	t.charColor(r, g, b);
	t.point();
	t.pop();

	drawText(`${stick.magnitude.toFixed(2)}`, cx - 2, cy + 3, 120, 120, 120);
}

t.draw(() => {
	t.background(0);

	drawText('standard gamepad mapping', -28, -18, 255, 255, 255);

	const pads = t.gamepads;

	if (pads.length === 0) {
		drawText('connect a standard-mapped controller', -28, -6, 180, 180, 180);
		return;
	}

	// Use the first standard-mapped pad
	const pad = pads.find((p) => p.standard) || pads[0];

	if (!pad.standard) {
		drawText(`slot ${pad.index} — no standard mapping`, -28, -14, 220, 120, 80);
		drawText(pad.id.slice(0, 50), -28, -12, 120, 120, 120);
		drawText('this controller does not report a standard layout', -28, -10, 140, 140, 140);
		drawText('raw buttons and axes are still accessible via t.gamepads', -28, -8, 110, 110, 110);
		return;
	}

	const s = pad.standard;

	drawText(`slot ${pad.index}`, -28, -16, 200, 200, 200);
	drawText(pad.id.slice(0, 46), -19, -16, 110, 110, 110);

	// ── Shoulders / triggers ──
	drawButton('L1', s.shoulders.l1, -26, -12);
	drawButton('R1', s.shoulders.r1, 8, -12);
	drawButton('L2', s.shoulders.l2, -26, -11);
	drawButton('R2', s.shoulders.r2, 8, -11);

	// ── D-pad ──
	drawText('D-PAD', -24, -8, 140, 140, 140);
	drawButton('U', s.dpad.up, -22, -7);
	drawButton('L', s.dpad.left, -24, -6);
	drawButton('R', s.dpad.right, -20, -6);
	drawButton('D', s.dpad.down, -22, -5);

	// ── Face buttons ──
	drawText('FACE', 10, -8, 140, 140, 140);
	drawButton('N', s.faceButtons.north, 12, -7);
	drawButton('W', s.faceButtons.west, 10, -6);
	drawButton('E', s.faceButtons.east, 14, -6);
	drawButton('S', s.faceButtons.south, 12, -5);

	// ── Center ──
	drawButton('SEL', s.center.select, -6, -8);
	drawButton('START', s.center.start, -1, -8);
	if (s.center.home) {
		drawButton('HOME', s.center.home, -4, -7);
	}

	// ── Left stick ──
	drawStick('L-STICK', s.leftStick, -18, -1, 255, 220, 100);
	drawButton('L3', s.center.leftStickPress, -19, 3);

	// ── Right stick ──
	drawStick('R-STICK', s.rightStick, 4, -1, 100, 220, 255);
	drawButton('R3', s.center.rightStickPress, 3, 3);

	// ── Raw button values bar ──
	drawText('raw button values', -28, 7, 110, 110, 110);

	for (let i = 0; i < Math.min(pad.buttons.length, 17); i++) {
		const b = pad.buttons[i];
		const barLen = Math.round(b.value * 8);
		const bar = '#'.repeat(barLen) + '.'.repeat(8 - barLen);
		const idx = (i < 10 ? ' ' : '') + i;
		const bright = b.value >= 0.5 ? 220 : 120;
		drawText(`${idx}:${bar}`, -28 + (i % 3) * 20, 9 + Math.floor(i / 3), bright, bright, bright);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
