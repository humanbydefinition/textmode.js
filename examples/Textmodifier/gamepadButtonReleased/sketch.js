/**
 * @title Textmodifier.gamepadButtonReleased
 * @description Show a cooldown board of button release edges, distinct from the press callback.
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const releases = [];

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

t.gamepadButtonReleased((data) => {
	const label = data.standardButtonName || `btn[${data.buttonIndex}]`;
	releases.unshift({
		text: `slot ${data.gamepad.index}  ${label}`,
		age: 0,
	});

	if (releases.length > 10) releases.length = 10;
});

t.draw(() => {
	t.background(0);

	drawText('gamepadButtonReleased()', -28, -18, 255, 255, 255);
	drawText('release a held button to log its edge transition', -28, -16, 140, 140, 140);
	drawText('release log', -28, -12, 180, 180, 180);
	drawText('----------------------------------------', -28, -11, 60, 60, 60);

	if (releases.length === 0) {
		drawText('hold a button, then let go', -28, -6, 100, 100, 100);
	}

	for (let i = 0; i < releases.length; i++) {
		const entry = releases[i];
		entry.age++;
		const fade = Math.max(0.2, 1 - entry.age / 240);
		const a = Math.round(255 * fade);
		const cool = 100 + Math.round(120 * fade);

		drawText('v', -28, -8 + i * 2, 120, 160, 255, a);
		drawText(entry.text, -26, -8 + i * 2, 140, 180, cool, a);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
