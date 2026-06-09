/**
 * @title Textmodifier.printAlign
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});
const labelLayer = t.layers.add();

const alignments = [
	['left', 'top'],
	['center', 'top'],
	['right', 'top'],
	['left', 'middle'],
	['center', 'middle'],
	['right', 'middle'],
	['left', 'bottom'],
	['center', 'bottom'],
	['right', 'bottom'],
];

const placementAlign = { left: 'right', center: 'center', right: 'left' };
const placementVerticalAlign = { top: 'bottom', middle: 'middle', bottom: 'top' };

t.draw(() => {
	t.background(6, 10, 22);

	const cols = t.grid.cols;
	const rows = t.grid.rows;
	t.push();
	t.charColor(20, 25, 45);
	for (let y = -Math.floor(rows / 2); y < Math.floor(rows / 2); y += 4) {
		for (let x = -Math.floor(cols / 2); x < Math.floor(cols / 2); x += 4) {
			t.push();
			t.translate(x, y);
			t.char('+');
			t.point();
			t.pop();
		}
	}
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	const bottom = Math.floor(t.grid.rows / 2);
	const index = Math.floor(t.frameCount / 90) % alignments.length;
	const [h, v] = alignments[index];
	const label = `${h}, ${v}`;
	const labelX = h === 'left' ? -1 : h === 'right' ? 1 : 0;
	const labelY = v === 'top' ? -1 : v === 'bottom' ? 1 : 0;

	t.push();
	t.char('O');
	t.charColor(255, 100, 100);
	t.invert(true);
	t.point();
	t.pop();

	t.push();
	t.printAlign(placementAlign[h], placementVerticalAlign[v]);
	t.charColor(100, 220, 255);
	t.print(
		`ALIGNMENT: [fg=yellow][inv] ${label.toUpperCase()} [/inv][/fg]\nAnchor: (0, 0)\nLines: 5\nHorizontal: ${h}\nVertical: ${v}`,
		labelX,
		labelY
	);
	t.pop();

	t.push();
	t.printAlign('center', 'top');
	t.charColor(100, 255, 140);
	t.print('TEXTMODIFIER.PRINTALIGN', 0, top + 2);

	t.charColor(80, 100, 150);
	t.print('------------------------------------------------', 0, top + 3);

	t.charColor(140, 160, 190);
	t.print('Anchored typography positioning demo. \nCycles automatically.', 0, top + 4);
	t.pop();

	t.push();
	t.printAlign('center', 'bottom');
	t.charColor(80, 100, 150);
	t.print('------------------------------------------------', 0, bottom - 3);
	t.charColor(120, 130, 150);
	t.print(`Active state: ${index + 1} of ${alignments.length} | Frame: ${t.frameCount}`, 0, bottom - 2);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
