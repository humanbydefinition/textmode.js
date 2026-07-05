/**
 * @title TextmodeGrid.setCols
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 22);

	// Animate column count dynamically between 16 and 40
	const cols = 28 + Math.floor(Math.sin(t.frameCount * 0.05) * 12);
	t.grid.cols = cols;

	const rows = t.grid.rows;
	const halfWidth = Math.floor(cols / 2);
	const halfHeight = Math.floor(rows / 2);

	t.push();
	t.translate(-halfWidth, -halfHeight);
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const wave = Math.sin(c * 0.3 + t.frameCount * 0.08) * 0.4 + 0.5;
			const rNormalized = r / rows;

			t.push();
			t.translate(c, r);
			if (Math.abs(rNormalized - wave) < 0.15) {
				t.char('★');
				t.charColor(100, 255, 180);
			} else {
				t.char('.');
				t.charColor(50, 70, 100);
			}
			t.point();
			t.pop();
		}
	}
	t.pop();
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODEGRID.SETCOLS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: MUTATE COLUMN COUNT', x, y++, 100, 220, 255);
	drawText('Dynamically overrides grid width.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`GRID COLS: ${t.grid.cols} cells`, x, y++, 100, 180, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
