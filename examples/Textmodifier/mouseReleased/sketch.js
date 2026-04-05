/**
 * @title Textmodifier.mouseReleased
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

const lines = [];
let dragStart = null;

t.mousePressed((data) => {
	if (data.position.x === Number.NEGATIVE_INFINITY) return;
	dragStart = { x: data.position.x, y: data.position.y };
});

t.mouseReleased((data) => {
	if (!dragStart || data.position.x === Number.NEGATIVE_INFINITY) return;

	const x = data.position.x;
	const y = data.position.y;
	const centerX = (dragStart.x + x) / 2;
	const centerY = (dragStart.y + y) / 2;
	const dx = x - dragStart.x;
	const dy = y - dragStart.y;

	lines.push({ cx: centerX, cy: centerY, dx, dy, age: 0, maxAge: 30 });
	dragStart = null;
});

t.draw(() => {
	t.background(0);

	for (let i = lines.length - 1; i >= 0; i--) {
		const line = lines[i];
		line.age += 1;

		if (line.age >= line.maxAge) {
			lines.splice(i, 1);
			continue;
		}

		const life = 1 - line.age / line.maxAge;
		const brightness = Math.round(150 * life);

		t.push();
		t.charColor(brightness, brightness, 255);
		t.char('-');
		t.lineWeight(2);
		t.translate(line.cx, line.cy);
		t.line(-line.dx / 2, -line.dy / 2, line.dx / 2, line.dy / 2);
		t.pop();
	}

	if (dragStart && t.mouse.x !== Number.NEGATIVE_INFINITY) {
		const centerX = (dragStart.x + t.mouse.x) / 2;
		const centerY = (dragStart.y + t.mouse.y) / 2;
		const dx = t.mouse.x - dragStart.x;
		const dy = t.mouse.y - dragStart.y;

		t.push();
		t.charColor(255, 200, 0);
		t.char('o');
		t.lineWeight(2);
		t.translate(centerX, centerY);
		t.line(-dx / 2, -dy / 2, dx / 2, dy / 2);
		t.pop();
	}
});
