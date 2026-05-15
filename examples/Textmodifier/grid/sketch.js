/**
 * @title Textmodifier.grid
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

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

t.draw(() => {
	t.background(6, 10, 22);

	const { cols, rows, cellWidth, cellHeight } = t.grid;
	const time = t.secs;

	t.push();
	t.charColor(30, 35, 50);
	t.char('.');
	t.rect(cols, rows);
	t.pop();

	const scanY = Math.floor((Math.sin(time * 0.8) * 0.5 + 0.5) * rows - rows / 2);
	const scanX = Math.floor((Math.cos(time * 1.1) * 0.5 + 0.5) * cols - cols / 2);

	t.push();
	t.translate(0, scanY);
	t.charColor(100, 200, 255, 150);
	t.char('-');
	t.rect(cols, 1);
	t.pop();

	t.push();
	t.translate(scanX, 0);
	t.charColor(100, 255, 150, 150);
	t.char('|');
	t.rect(1, rows);
	t.pop();

	t.push();
	t.translate(scanX, scanY);
	t.char('☼');
	t.charColor(255, 255, 255);
	t.point();
	t.pop();

	drawCenteredText('Textmodifier.grid', -14, [255, 255, 255]);
	drawCenteredText('Provides access to dimensions and cell properties.', -12, [150, 170, 200]);

	t.push();
	t.translate(0, 10);
	drawCenteredText(`Grid Size: ${cols} x ${rows} cells`, 0, [140, 180, 255]);
	drawCenteredText(`Cell Size: ${cellWidth} x ${cellHeight} pixels`, 2, [140, 180, 255]);
	drawCenteredText(`Canvas Area: ${t.grid.width} x ${t.grid.height} pixels`, 4, [140, 180, 255]);
	t.pop();

	drawCenteredText('Resize window to see grid update', 18, [100, 100, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
