/**
 * @title Textmodifier.deltaTime
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

let x = -40;
const speed = 0.05;

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

	x += speed * t.deltaTime();
	if (x > t.grid.cols / 2 + 5) {
		x = -t.grid.cols / 2 - 5;
	}

	t.push();
	t.translate(x, 0);
	t.char('>');
	t.charColor(255, 100, 50);
	t.rect(4, 2);
	t.pop();

	drawLabel(`deltaTime(): ${t.deltaTime().toFixed(2)} ms`, -12);
});
