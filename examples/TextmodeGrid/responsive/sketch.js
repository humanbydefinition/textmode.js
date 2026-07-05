/**
 * @title TextmodeGrid.responsive
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let isLocked = false;

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

	const modeText = isLocked ? 'LOCKED (26x12)' : 'RESPONSIVE';

	drawText('TEXTMODEGRID.RESPONSIVE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: AUTO-RESPONSIVE GRID', x, y++, 100, 220, 255);
	drawText(`GRID STATE: ${modeText}`, x, y++, isLocked ? 255 : 150, isLocked ? 150 : 255, isLocked ? 150 : 200);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('Click anywhere to toggle grid lock.', x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
