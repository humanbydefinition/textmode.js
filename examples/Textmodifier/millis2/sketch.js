/**
 * @title Textmodifier.millis2
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

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

	const time = t.millis / 1000;
	const x = Math.sin(time) * 20;

	t.push();
	t.translate(x, 0);
	t.char('O');
	t.charColor(100, 220, 255);
	t.point();
	t.pop();

	drawLabel('millis / 1000 drives horizontal motion', -12);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
