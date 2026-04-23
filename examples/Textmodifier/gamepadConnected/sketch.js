/**
 * @title Textmodifier.gamepadConnected
 * @description Highlight controller arrivals with a growing burst and a short connection ledger.
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const bursts = [];
const ledger = [];

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

t.gamepadConnected((data) => {
	const burstY = -6 + (bursts.length % 5) * 3;
	bursts.push({
		slot: data.gamepad.index,
		id: data.gamepad.id.slice(0, 32),
		x: -16 + (bursts.length % 4) * 12,
		y: burstY,
		radius: 0,
		life: 1,
	});

	ledger.unshift(`slot ${data.gamepad.index}  ${data.gamepad.id.slice(0, 36)}`);
	if (ledger.length > 6) ledger.length = 6;
});

t.draw(() => {
	t.background(0);

	drawText('gamepadConnected()', -28, -18, 255, 255, 255);
	drawText('plug in or wake a controller to trigger the callback', -28, -16, 140, 140, 140);
	drawText(`connected now: ${t.gamepads.length}`, -28, -14, 100, 200, 120);

	for (let i = bursts.length - 1; i >= 0; i--) {
		const burst = bursts[i];
		burst.radius += 0.4;
		burst.life -= 0.015;

		if (burst.life <= 0) {
			bursts.splice(i, 1);
			continue;
		}

		const a = Math.round(255 * burst.life);
		drawText(`slot ${burst.slot}`, burst.x - 2, burst.y - 2, 255, 200, 80, a);

		for (let ring = 0; ring < 8; ring++) {
			const angle = (Math.PI * 2 * ring) / 8;
			const x = Math.round(burst.x + Math.cos(angle) * burst.radius);
			const y = Math.round(burst.y + Math.sin(angle) * burst.radius * 0.6);
			drawText('*', x, y, 100, 220, 140, a);
		}
	}

	drawText('recent arrivals', -28, -8, 180, 180, 180);
	drawText('----------------------------------------------', -28, -7, 60, 60, 60);

	if (ledger.length === 0) {
		drawText('waiting for the first connection event...', -28, -5, 100, 100, 100);
	}

	for (let i = 0; i < ledger.length; i++) {
		drawText(ledger[i], -28, -5 + i * 2, 160, 220, 180);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
