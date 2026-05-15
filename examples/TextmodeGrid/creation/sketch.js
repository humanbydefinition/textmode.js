/**
 * @title TextmodeGrid.creation
 * @author codex
 */

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let isLocked = false;

t.setup(() => {
	t.grid.cols = 40;
	t.grid.rows = 20;
	isLocked = true;
});

function drawLabel(text, x, y, col = [255, 255, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(...col);
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
	t.background(10, 15, 24);

	const { cols, rows } = t.grid;
	const time = t.frameCount * 0.05;

	t.char('.');
	t.charColor(60, 80, 110);
	t.rect(cols, rows);

	const scanX = Math.floor((Math.sin(time * 0.7) * 0.5 + 0.5) * cols);
	t.push();
	t.translate(scanX - (cols - 1) / 2, 0);
	t.char('|');
	t.charColor(100, 200, 255);
	t.rect(1, rows);
	t.pop();

	const title = '--- TEXTMODE GRID CREATION ---';
	drawLabel(title, -(title.length - 1) / 2, -(rows - 1) / 2 + 2, [255, 220, 100]);

	const modeText = isLocked ? 'MODE: LOCKED (FIXED 40x20)' : 'MODE: RESPONSIVE (AUTO)';
	drawLabel(modeText, -(modeText.length - 1) / 2, -1, isLocked ? [255, 100, 100] : [100, 255, 100]);

	const dimText = `CURRENT SIZE: ${cols} x ${rows}`;
	drawLabel(dimText, -(dimText.length - 1) / 2, 1, [150, 180, 255]);

	const hint = 'Click to toggle responsiveness';
	drawLabel(hint, -(hint.length - 1) / 2, (rows - 1) / 2 - 3, [120, 120, 120]);
});

t.mousePressed(() => {
	isLocked = !isLocked;

	if (isLocked) {
		t.grid.cols = 40;
		t.grid.rows = 20;
	} else {
		t.grid.responsive();
		t.grid.reset();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
