/**
 * @title TextmodeGrid.setRows
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
	t.background(20, 10, 25);

	const { cols, rows } = t.grid;
	const time = t.frameCount * 0.1;

	t.charColor(150, 100, 255);
	t.char('=');
	for (let y = 0; y < rows; y++) {
		const w = Math.floor(10 + Math.sin(time + y * 0.3) * 8);
		t.push();
		t.translate(0, y - (rows - 1) / 2);
		t.rect(w, 1);
		t.pop();
	}

	const title = '--- GRID.ROWS SETTER ---';
	drawLabel(title, -(title.length - 1) / 2, -(rows - 1) / 2 + 2, [220, 180, 255]);

	const valText = `ROWS: ${rows}`;
	drawLabel(valText, -(valText.length - 1) / 2, 0, [255, 255, 255]);

	const hint = 'Move mouse to resize rows';
	drawLabel(hint, -(hint.length - 1) / 2, (rows - 1) / 2 - 2, [150, 120, 150]);
});

t.mouseMoved((e) => {
	if (e.position.y !== Number.NEGATIVE_INFINITY) {
		const targetRows = Math.floor(20 + e.position.y * 2);
		t.grid.rows = Math.max(5, Math.min(60, targetRows));
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
