/**
 * @title TextmodeGrid.responsive
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let isLocked = false;

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
	t.background(10, 20, 15);

	const { cols, rows } = t.grid;
	const time = t.frameCount * 0.05;

	t.charColor(30, 60, 40);
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			t.push();
			t.translate(x - (cols - 1) / 2, y - (rows - 1) / 2);
			const charCode = 33 + Math.abs(Math.floor(Math.sin(time + (x + y) * 0.1) * 10));
			t.char(String.fromCharCode(charCode));
			t.point();
			t.pop();
		}
	}

	t.char(' ');
	t.charColor(isLocked ? [255, 100, 100] : [100, 255, 150]);
	t.rect(cols - 2, rows - 2);

	const modeText = isLocked ? 'GRID: LOCKED (26x12)' : 'GRID: RESPONSIVE';
	drawLabel(modeText, -(modeText.length - 1) / 2, 0, isLocked ? [255, 150, 150] : [150, 255, 200]);

	const hint = 'Click to toggle';
	drawLabel(hint, -(hint.length - 1) / 2, (rows - 1) / 2 - 2, [100, 100, 100]);
});

t.mousePressed(() => {
	isLocked = !isLocked;

	if (isLocked) {
		t.grid.cols = 26;
		t.grid.rows = 12;
	} else {
		t.grid.responsive();
		t.grid.reset();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
