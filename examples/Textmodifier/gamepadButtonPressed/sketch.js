/**
 * @title Textmodifier.gamepadButtonPressed
 * @description Turn button press edges into short-lived hit markers with semantic labels when available.
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const hits = [];

function drawText(text, x, y, r = 220, g = r, b = r, a = 255) {
	t.push();
	t.translate(x, y);
	t.charColor(r, g, b, a);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.gamepadButtonPressed((data) => {
	const label = data.standardButtonName || `btn[${data.buttonIndex}]`;
	hits.unshift({
		text: `slot ${data.gamepad.index}  ${label}  ${data.button.value.toFixed(2)}`,
		x: -24 + (hits.length % 3) * 18,
		y: -3 + (hits.length % 5) * 3,
		life: 1,
	});

	if (hits.length > 18) hits.length = 18;
});

t.draw(() => {
	t.background(0);

	drawText('gamepadButtonPressed()', -28, -18, 255, 255, 255);
	drawText('press any gamepad button to spawn a hit marker', -28, -16, 140, 140, 140);
	drawText(`connected: ${t.gamepads.length}`, -28, -14, 120, 180, 255);

	if (hits.length === 0) {
		drawText('waiting for a button press...', -28, -4, 100, 100, 100);
	}

	for (let i = hits.length - 1; i >= 0; i--) {
		const hit = hits[i];
		hit.life -= 0.02;
		hit.y -= 0.04;

		if (hit.life <= 0) {
			hits.splice(i, 1);
			continue;
		}

		const a = Math.round(255 * hit.life);
		drawText('+', hit.x - 2, Math.round(hit.y), 255, 220, 90, a);
		drawText(hit.text, hit.x, Math.round(hit.y), 255, 200, 110, a);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
