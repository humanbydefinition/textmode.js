/**
 * @title Textmodifier.gamepads
 * @description Polling API: list connected controllers, raw buttons, axes, and standard helpers.
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

function formatAxis(value) {
	return (value >= 0 ? '+' : '') + value.toFixed(2);
}

t.draw(() => {
	t.background(0);

	const pads = t.gamepads;

	drawText('gamepad polling api', -28, -18, 255, 255, 255);
	drawText(`connected: ${pads.length}`, -28, -16, pads.length > 0 ? 120 : 90, pads.length > 0 ? 220 : 90, pads.length > 0 ? 120 : 90);

	if (pads.length === 0) {
		drawText('connect a controller and press any button', -28, -6, 180, 180, 180);
		drawText('some browsers wait for input before exposing a pad', -28, -4, 110, 110, 110);
		return;
	}

	pads.slice(0, 2).forEach((pad, listIndex) => {
		const y = -12 + listIndex * 14;
		const slot = t.gamepad(pad.index);

		// Header
		drawText(`slot ${pad.index}`, -28, y, 255, 200, 80);
		drawText(pad.mapping === 'standard' ? 'standard' : 'raw', -21, y, 120, 180, 255);
		drawText(slot ? 'ok' : 'missing', -13, y, slot ? 100 : 255, slot ? 160 : 80, slot ? 100 : 80);
		drawText(pad.id.slice(0, 50), -28, y + 1, 120, 120, 120);

		// Raw axes
		const axisStr = pad.axes
			.slice(0, 6)
			.map((v, i) => `a${i}:${formatAxis(v)}`)
			.join(' ');
		drawText(axisStr || 'no axes', -28, y + 3, 180, 200, 220);

		// Raw buttons
		const btnStr = pad.buttons
			.slice(0, 17)
			.map((b) => (b.value >= 0.5 ? '#' : b.value > 0.01 ? ':' : '.'))
			.join('');
		drawText(`btn ${btnStr}`, -28, y + 5, 180, 200, 220);

		// Analog button values for triggers
		if (pad.buttons.length >= 8) {
			const l2 = pad.buttons[6].value.toFixed(2);
			const r2 = pad.buttons[7].value.toFixed(2);
			drawText(`l2:${l2} r2:${r2}`, -28, y + 7, 160, 160, 180);
		}

		// Standard mapping helpers
		if (pad.standard) {
			const face = pad.standard.faceButtons;
			const dpad = pad.standard.dpad;
			const ls = pad.standard.leftStick;
			const rs = pad.standard.rightStick;

			// Face buttons
			drawText(`  N:${face.north.pressed ? '#' : '.'}`, 6, y + 2, 160, 220, 160);
			drawText(`W:${face.west.pressed ? '#' : '.'} E:${face.east.pressed ? '#' : '.'}`, 6, y + 3, 160, 220, 160);
			drawText(`  S:${face.south.pressed ? '#' : '.'}`, 6, y + 4, 160, 220, 160);

			// D-pad
			drawText(`  U:${dpad.up.pressed ? '#' : '.'}`, 18, y + 2, 220, 180, 120);
			drawText(`L:${dpad.left.pressed ? '#' : '.'} R:${dpad.right.pressed ? '#' : '.'}`, 18, y + 3, 220, 180, 120);
			drawText(`  D:${dpad.down.pressed ? '#' : '.'}`, 18, y + 4, 220, 180, 120);

			// Left stick
			drawText('L-stick', 6, y + 6, 100, 140, 180);
			const lx = Math.round(10 + ls.x * 4);
			const ly = Math.round(y + 8 + ls.y * 2);
			t.push();
			t.translate(lx, ly);
			t.char(ls.magnitude > 0 ? '@' : '+');
			t.charColor(255, 220, 100);
			t.point();
			t.pop();

			// Right stick
			drawText('R-stick', 18, y + 6, 100, 140, 180);
			const rx = Math.round(22 + rs.x * 4);
			const ry = Math.round(y + 8 + rs.y * 2);
			t.push();
			t.translate(rx, ry);
			t.char(rs.magnitude > 0 ? '@' : '+');
			t.charColor(100, 220, 255);
			t.point();
			t.pop();
		}
	});
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
