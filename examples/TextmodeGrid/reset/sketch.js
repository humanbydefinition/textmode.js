/**
 * @title TextmodeGrid.reset
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let isLocked = false;
let resetAnim = 0;

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
	t.background(15, 15, 20);

	const { cols, rows } = t.grid;

	t.char('+');
	t.charColor(40, 40, 60);
	t.rect(cols, rows);

	if (resetAnim > 0) {
		t.char(' ');
		t.charColor(100, 150, 255);
		t.rect(cols * resetAnim, rows * resetAnim);
		resetAnim *= 0.9;
		if (resetAnim < 0.01) resetAnim = 0;
	}

	const stateText = isLocked ? 'MANUAL OVERRIDE: ON' : 'MANUAL OVERRIDE: OFF';
	drawLabel(stateText, -(stateText.length - 1) / 2, -1, isLocked ? [255, 180, 100] : [100, 180, 255]);

	const sizeText = `GRID SIZE: ${cols}x${rows}`;
	drawLabel(sizeText, -(sizeText.length - 1) / 2, 1, [150, 150, 180]);

	const hint = 'Click to toggle t.grid.reset()';
	drawLabel(hint, -(hint.length - 1) / 2, (rows - 1) / 2 - 2, [80, 80, 80]);
});

t.mousePressed(() => {
	isLocked = !isLocked;

	if (isLocked) {
		t.grid.cols = 32;
		t.grid.rows = 16;
	} else {
		t.grid.responsive();
		t.grid.reset();
		resetAnim = 1.0;
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
