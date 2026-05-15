/**
 * @title TextmodeGrid.setCols
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
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
	t.background(10, 25, 10);

	const { cols, rows } = t.grid;
	const time = t.frameCount * 0.1;

	t.charColor(0, 200, 100);
	t.char('|');
	for (let x = 0; x < cols; x++) {
		const h = Math.floor(6 + Math.sin(time + x * 0.2) * 4);
		t.push();
		t.translate(x - (cols - 1) / 2, 0);
		t.rect(1, h);
		t.pop();
	}

	const title = '--- GRID.COLS SETTER ---';
	drawLabel(title, -(title.length - 1) / 2, -(rows - 1) / 2 + 2, [200, 255, 200]);

	const valText = `COLS: ${cols}`;
	drawLabel(valText, -(valText.length - 1) / 2, 0, [255, 255, 255]);

	const hint = 'Move mouse to resize columns';
	drawLabel(hint, -(hint.length - 1) / 2, (rows - 1) / 2 - 2, [120, 150, 120]);
});

t.mouseMoved((e) => {
	if (e.position.x !== Number.NEGATIVE_INFINITY) {
		const targetCols = Math.floor(40 + e.position.x * 2);
		t.grid.cols = Math.max(5, Math.min(100, targetCols));
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
