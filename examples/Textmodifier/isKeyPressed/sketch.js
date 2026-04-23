/**
 * @title Textmodifier.isKeyPressed
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let playerX = 0;
let playerY = 0;

t.draw(() => {
	t.background(0);

	if (t.isKeyPressed('ArrowUp')) {
		playerY -= 1;
	}
	if (t.isKeyPressed('ArrowDown')) {
		playerY += 1;
	}
	if (t.isKeyPressed('ArrowLeft')) {
		playerX -= 1;
	}
	if (t.isKeyPressed('ArrowRight')) {
		playerX += 1;
	}

	t.char('@');
	t.charColor(255, 255, 0);
	t.translate(playerX, playerY);
	t.point();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
