/**
 * @title Textmodifier.modifierState
 * @author codex
 */
const t = textmode.create({ width: 640, height: 640, fontSize: 16 });

function drawLabel(text, x, y, color = 180) {
	t.push();
	t.translate(x - Math.floor(text.length / 2), y);
	t.charColor(color);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

function drawPanel(x, y, label, active, hue) {
	const pulse = 4 + Math.sin(t.frameCount * 0.08) * 2;
	const glow = active ? 255 : 70;
	const cell = active ? hue : 15;
	const icon = active ? '*' : '.';
	const status = active ? 'ON' : 'OFF';

	t.push();
	t.translate(x, y);
	t.charColor(glow, glow, glow);
	t.cellColor(cell, active ? hue : 15, 20);
	t.char(icon);
	t.rect(10 + pulse, 6 + pulse * 0.3);

	t.charColor(active ? 0 : 190, active ? 0 : 190, active ? 0 : 190);
	drawLabel(label, 0, -1, active ? 0 : 200);
	drawLabel(status, 0, 1, active ? 0 : 120);
	t.pop();
}

t.draw(() => {
	const { shift, ctrl, alt, meta } = t.modifierState;
	const activeCount = [shift, ctrl, alt, meta].filter(Boolean).length;
	const orbit = activeCount === 0 ? 0 : 6 + Math.sin(t.frameCount * 0.05) * 2;

	t.background(0);

	drawPanel(-12, -8, 'SHIFT', shift, 255);
	drawPanel(12, -8, 'CTRL', ctrl, 220);
	drawPanel(-12, 8, 'ALT', alt, 180);
	drawPanel(12, 8, 'META', meta, 140);

	drawLabel('hold shift ctrl alt or cmd', 0, -15, 200);
	drawLabel(activeCount === 0 ? 'idle input state' : `${activeCount} modifier active`, 0, 15, 160);

	t.push();
	t.rotateZ(t.frameCount * 2);
	t.char(activeCount === 0 ? '+' : '#');
	t.charColor(255, 220 - activeCount * 20, 120 + activeCount * 30);
	t.rect(4 + orbit * 0.2, 4 + orbit * 0.2);
	t.pop();
});
