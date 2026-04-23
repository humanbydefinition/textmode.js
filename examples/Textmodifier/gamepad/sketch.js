/**
 * @title Textmodifier.gamepad
 * @description Resolve controllers by browser slot index and inspect each slot individually.
 * @author codex
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

	drawText('gamepad(index)', -28, -18, 255, 255, 255);
	drawText('resolve specific browser slots even when indexes are sparse', -28, -16, 140, 140, 140);
	drawText(`compact list length: ${t.gamepads.length}`, -28, -14, 120, 180, 255);

	for (let slotIndex = 0; slotIndex < 4; slotIndex++) {
		const pad = t.gamepad(slotIndex);
		const y = -10 + slotIndex * 7;

		drawText(`slot ${slotIndex}`, -28, y, 255, 200, 90);

		if (!pad) {
			drawText('empty', -20, y, 90, 90, 90);
			drawText('connect a controller or press a button to wake the browser api', -28, y + 2, 100, 100, 100);
			continue;
		}

		drawText(pad.id.slice(0, 48), -20, y, 180, 180, 180);
		drawText(`mapping: ${pad.mapping || 'raw'}`, -28, y + 2, 120, 180, 255);

		const axes = pad.axes
			.slice(0, 4)
			.map((value, axisIndex) => `a${axisIndex}:${formatAxis(value)}`)
			.join(' ');
		drawText(axes || 'no axes', -11, y + 2, 160, 200, 220);

		const pressedCount = pad.buttons.filter((button) => button.value >= 0.5).length;
		const triggerValue = pad.buttons[6] ? pad.buttons[6].value.toFixed(2) : '--';
		drawText(`pressed:${pressedCount} l2:${triggerValue}`, -28, y + 4, 160, 220, 160);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
