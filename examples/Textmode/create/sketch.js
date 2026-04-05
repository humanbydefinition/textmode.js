/**
 * @title Textmode.create
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const label = 'textmode.create()';
const chars = ['.', '+', '*', 'o'];

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
	t.background(6, 14, 22);

	for (let ray = 0; ray < 12; ray++) {
		const angle = t.frameCount * 0.03 + (Math.PI * 2 * ray) / 12;

		for (let step = 3; step <= 10; step++) {
			const pulse = 0.5 + 0.5 * Math.sin(t.frameCount * 0.08 - step + ray * 0.4);
			const radius = step * (1.6 + pulse * 0.6);
			const x = Math.round(Math.cos(angle) * radius * 1.7);
			const y = Math.round(Math.sin(angle) * radius);
			const char = chars[(ray + step) % chars.length];

			t.push();
			t.translate(x, y);
			t.charColor(70 + step * 18, 160 + Math.round(pulse * 70), 255);
			t.char(char);
			t.point();
			t.pop();
		}
	}

	drawCenteredText(label, 0, [240, 245, 255]);
	drawCenteredText('returns a Textmodifier', 5, [130, 180, 230]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
