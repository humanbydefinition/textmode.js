/**
 * @title Textmodifier.mouseReleased
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let dragStart = null;
let lastRelease = null;

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
	dragStart = { x: data.position.x, y: data.position.y };
});

t.mouseReleased((data) => {
	if (!dragStart) return;
	lastRelease = {
		x: data.position.x,
		y: data.position.y,
		sx: dragStart.x,
		sy: dragStart.y,
		time: t.secs,
	};
	dragStart = null;
});

t.draw(() => {
	t.background(6, 10, 22);

	if (dragStart && t.mouse.x !== Number.NEGATIVE_INFINITY) {
		t.push();
		t.charColor(100, 200, 255);
		t.char('.');
		t.line(dragStart.x, dragStart.y, t.mouse.x, t.mouse.y);
		t.translate(dragStart.x, dragStart.y);
		t.char('O');
		t.point();
		t.pop();
	}

	if (lastRelease) {
		const life = Math.max(0, 1.0 - (t.secs - lastRelease.time) * 1.5);
		if (life > 0) {
			t.push();
			t.charColor(255, 140, 180, life * 255);
			t.char('-');
			t.line(lastRelease.sx, lastRelease.sy, lastRelease.x, lastRelease.y);
			t.translate(lastRelease.x, lastRelease.y);
			t.char('X');
			t.point();
			t.pop();
		}
	}

	drawCenteredText('Textmodifier.mouseReleased', -22, [255, 255, 255]);
	drawCenteredText('Triggers once when a button is let go.', -20, [150, 170, 200]);
	drawCenteredText('Used to finalize drags or projectiles.', -18, [150, 170, 200]);

	drawCenteredText('Click, Drag, and RELEASE to "slingshot"', 18, [255, 140, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
