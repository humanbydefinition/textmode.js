/**
 * @title Textmodifier.requestPointerLock
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let cursor = { x: 0, y: 0 };

t.mouseClicked(() => {
	if (document.pointerLockElement === t.canvas) {
		t.exitPointerLock();
	} else {
		t.requestPointerLock();
	}
});

t.draw(() => {
	t.background(0);

	if (document.pointerLockElement === t.canvas) {
		cursor.x += t.movedX * 0.08;
		cursor.y += t.movedY * 0.08;
	}

	cursor.x = Math.max(-t.grid.cols / 2, Math.min(t.grid.cols / 2, cursor.x));
	cursor.y = Math.max(-t.grid.rows / 2, Math.min(t.grid.rows / 2, cursor.y));

	t.push();
	t.translate(cursor.x, cursor.y);
	t.char(document.pointerLockElement === t.canvas ? '@' : '+');
	t.charColor(document.pointerLockElement === t.canvas ? 255 : 180, 220, 120);
	t.point();
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
