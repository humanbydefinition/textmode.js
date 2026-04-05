/**
 * @title Textmodifier.secs
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

	const time = t.secs;
	const x = Math.sin(time * 2) * 20;
	const y = Math.cos(time * 3) * 10;

	t.push();
	t.translate(x, y);
	t.char('O');
	t.charColor(255, 100, 100);
	t.rect(3, 3);
	t.pop();

	drawLabel(`secs: ${t.secs.toFixed(2)}`, -12);
});
