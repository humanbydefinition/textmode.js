/**
 * @title Textmodifier.touchCancelled
 * @description Touch lifecycle beacon: started, ended, and cancelled events change the motion and color of a resilient status signal.
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let message = 'READY';
let color = [120, 190, 255];
let shock = 0;
let touchAge = 0;

t.touchStarted(() => {
	message = 'TOUCH STARTED';
	color = [120, 255, 190];
	shock = 1;
	touchAge = 0;
});

t.touchEnded(() => {
	message = 'TOUCH ENDED';
	color = [255, 210, 120];
	shock = 0.45;
});

t.touchCancelled(() => {
	message = 'TOUCH CANCELLED';
	color = [255, 90, 110];
	shock = 1.5;
});

t.draw(() => {
	t.background(6, 7, 12);

	const rows = t.grid.rows;
	const top = -Math.floor(rows / 2) + 4;
	const radius = 7 + shock * 5 + Math.sin(t.frameCount * 0.05) * 1.5;

	touchAge++;
	shock *= 0.94;

	drawText('touch cancelled', 0, top, [235, 240, 250]);
	drawText('leave the touch surface or let the browser interrupt a gesture', 0, top + 2, [130, 150, 180]);
	drawText(message, 0, Math.floor(rows / 2) - 5, color);
	drawText(`age ${touchAge} frames`, 0, Math.floor(rows / 2) - 3, [120, 140, 170]);

	for (let ring = 0; ring < 6; ring++) {
		const points = 18 + ring * 6;
		const ringRadius = radius + ring * 3;

		for (let i = 0; i < points; i++) {
			const angle = (i / points) * Math.PI * 2 + t.frameCount * 0.015 * (ring % 2 === 0 ? 1 : -1);
			const alpha = 80 + Math.max(0, shock) * 80 + ring * 14;

			t.push();
			t.translate(Math.cos(angle) * ringRadius * 1.65, Math.sin(angle) * ringRadius);
			t.rotateZ(t.frameCount * 0.3 + ring * 12);
			t.char(['.', ':', '+', '*', 'x', '#'][ring]);
			t.charColor(color[0], color[1] - ring * 12, color[2], alpha);
			t.point();
			t.pop();
		}
	}

	t.push();
	t.rotateZ(t.frameCount * 0.7);
	t.char(message === 'TOUCH CANCELLED' ? '!' : '+');
	t.charColor(color[0], color[1], color[2]);
	t.rect(11 + shock * 6, 11 + shock * 6);
	t.pop();

	if (message !== 'READY' && touchAge > 180 && shock < 0.02) {
		message = 'READY';
		color = [120, 190, 255];
	}
});

function drawText(text, x, y, textColor) {
	t.push();
	t.translate(x - Math.floor(text.length / 2), y);
	t.charColor(textColor[0], textColor[1], textColor[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
