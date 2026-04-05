/**
 * @title Textmodifier.millis
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

function drawLabel(text, y) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(180);

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
	t.background(0);

	const pulse = (t.millis % 1000) / 1000;
	const scale = 1 + Math.sin(pulse * Math.PI) * 0.5;
	const alpha = 255 * (1 - pulse);

	t.char('o');
	t.charColor(255, 50, 50, alpha);
	t.rect(10 * scale, 10 * scale);

	drawLabel(`millis: ${Math.floor(t.millis)}`, -12);
});
