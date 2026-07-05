/**
 * @title Textmodifier.touchMoved
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const pulses = [];
let count = 0;
let last = 'WAITING';

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function addPulse(label, x = 0, y = 0) {
	count++;
	last = label;
	pulses.unshift({ label, x, y, life: 1 });
	if (pulses.length > 12) pulses.length = 12;
}

t.touchMoved((data) => {
	const touch = data?.touch || t.mouse;
	addPulse('MOVES', touch?.x || 0, touch?.y || 0);
});

t.draw(() => {
	t.background(6, 10, 22);

	for (let i = pulses.length - 1; i >= 0; i--) {
		const p = pulses[i];
		p.life -= 0.02;
		if (p.life <= 0) {
			pulses.splice(i, 1);
			continue;
		}
		t.push();
		t.translate(p.x, p.y - (1 - p.life) * 4);
		t.char('*');
		t.charColor(255, 210, 120);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.TOUCHMOVED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: TOUCH MOVE', x, y++, 100, 220, 255);
	drawText('Event updates compact state.', x, y++, 140, 160, 190);
	drawText('Pulses show recent triggers.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('MOVES: ' + count, x, y++, 140, 255, 180);
	drawText('LAST: ' + last.slice(0, 28), x, y++, 180, 200, 220);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
