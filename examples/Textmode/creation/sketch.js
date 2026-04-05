/**
 * @title Textmode.creation
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
});

const label = 'textmode.create()';
const chars = 'TEXTMODE';

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.draw(() => {
	t.background(8, 12, 24);

	for (let i = 0; i < chars.length; i++) {
		const angle = t.frameCount * 0.03 + (Math.PI * 2 * i) / chars.length;
		const radius = 7 + Math.sin(t.frameCount * 0.08 + i) * 2;
		const x = Math.round(Math.cos(angle) * radius * 1.6);
		const y = Math.round(Math.sin(angle) * radius);

		t.push();
		t.translate(x, y);
		t.charColor(120 + i * 14, 180 + i * 6, 255);
		t.char(chars[i]);
		t.point();
		t.pop();
	}

	drawCenteredText(label, 0, [240, 245, 255]);
	drawCenteredText('creates a Textmodifier', 5, [140, 170, 210]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
