/**
 * @title Textmodifier.gamepadDisconnected
 * @description Keep a fading ledger of controllers that vanished from the current frame snapshot.
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const departures = [];

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

t.gamepadDisconnected((data) => {
	departures.unshift({
		text: `slot ${data.gamepad.index}  ${data.gamepad.id.slice(0, 36)}`,
		age: 0,
	});

	if (departures.length > 8) departures.length = 8;
});

t.draw(() => {
	t.background(0);

	drawText('gamepadDisconnected()', -28, -18, 255, 255, 255);
	drawText('disconnect or power down a controller to record its exit', -28, -16, 140, 140, 140);
	drawText(`connected now: ${t.gamepads.length}`, -28, -14, 120, 180, 255);

	drawText('last disconnect events', -28, -10, 200, 200, 200);
	drawText('----------------------------------------------', -28, -9, 60, 60, 60);

	if (departures.length === 0) {
		drawText('no disconnect observed yet', -28, -6, 110, 110, 110);
		drawText('the callback fires when a previously tracked pad disappears', -28, -4, 90, 90, 90);
	}

	for (let i = departures.length - 1; i >= 0; i--) {
		const entry = departures[i];
		entry.age++;
	}

	for (let i = 0; i < departures.length; i++) {
		const entry = departures[i];
		const fade = Math.max(0.2, 1 - entry.age / 300);
		const a = Math.round(255 * fade);
		const marker = fade > 0.6 ? 'x' : '.';

		drawText(marker, -28, -6 + i * 2, 255, 110, 110, a);
		drawText(entry.text, -26, -6 + i * 2, 255, 160, 160, a);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
