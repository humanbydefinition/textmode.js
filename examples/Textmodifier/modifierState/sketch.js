/**
 * @title Textmodifier.modifierState
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let active = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	const m = t.modifierState;
	active = [m.shift, m.ctrl, m.alt, m.meta].filter(Boolean).length;
	['SHIFT', 'CTRL', 'ALT', 'META'].forEach((name, i) => {
		const on = [m.shift, m.ctrl, m.alt, m.meta][i];
		t.push();
		t.translate((i - 1.5) * 7, 0);
		t.char(on ? '#' : '.');
		t.charColor(on ? 140 : 80, on ? 255 : 90, 180);
		t.rect(5, 3);
		t.pop();
	});
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MODIFIERSTATE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: MODIFIER KEYS', x, y++, 100, 220, 255);
	drawText('Tracks Shift/Ctrl/Alt/Meta.', x, y++, 140, 160, 190);
	drawText('Hold keys to light panels.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`ACTIVE: ${active}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
