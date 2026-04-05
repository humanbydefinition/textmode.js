/**
 * @title Textmodifier.touchEnded
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

const ghosts = [];

t.touchEnded((data) => {
	ghosts.push({ x: data.touch.x, y: data.touch.y, alpha: 255 });
});

t.draw(() => {
	t.background(0);

	for (let i = ghosts.length - 1; i >= 0; i--) {
		const ghost = ghosts[i];

		t.push();
		t.translate(ghost.x, ghost.y);
		t.char('○');
		t.charColor(255, 100, 100, ghost.alpha);
		t.ellipse(10, 10);
		t.pop();

		ghost.alpha -= 10;
		if (ghost.alpha <= 0) ghosts.splice(i, 1);
	}

	if (ghosts.length === 0) {
		t.charColor(100);
		t.char('?');
		t.rect(1, 1);
	}
});
