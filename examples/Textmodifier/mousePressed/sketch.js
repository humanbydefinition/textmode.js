/**
 * @title Textmodifier.mousePressed
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let hit = { x: 0, y: 0, time: -1 };

function drawCenteredText(text, row, rgb = [240, 245, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), row);
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

t.mousePressed((data) => {
	if (data.position.x === Number.NEGATIVE_INFINITY) return;
	hit.x = data.position.x;
	hit.y = data.position.y;
	hit.time = t.secs;
});

t.draw(() => {
	t.background(6, 10, 22);

	const elapsed = t.secs - hit.time;
	const life = Math.max(0, 1.0 - elapsed * 2);

	if (life > 0) {
		const particleCount = 12;
		for (let i = 0; i < particleCount; i++) {
			const angle = (i / particleCount) * Math.PI * 2;
			const r = (1.0 - life) * 30;
			t.push();
			t.translate(hit.x + Math.cos(angle) * r, hit.y + Math.sin(angle) * r);
			t.charColor(255, 200, 100, life * 255);
			t.char('*');
			t.point();
			t.pop();
		}
		t.push();
		t.translate(hit.x, hit.y);
		t.charColor(255, 255, 255, life * 255);
		t.char('O');
		t.ellipse(life * 10, life * 10);
		t.pop();
	}

	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		t.push();
		t.translate(t.mouse.x, t.mouse.y);
		t.char(t.mouseIsPressed ? '•' : '○');
		t.charColor(255);
		t.point();
		t.pop();
	}

	drawCenteredText('Textmodifier.mousePressed', -22, [255, 255, 255]);
	drawCenteredText('Triggers once when a button is hit.', -20, [150, 170, 200]);
	drawCenteredText('Best for one-time actions or UI hits.', -18, [150, 170, 200]);

	drawCenteredText('CLICK to trigger explosion', 18, [255, 200, 100]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
