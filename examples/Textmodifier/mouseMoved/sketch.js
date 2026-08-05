/**
 * @title Textmodifier.mouseMoved
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const RAMP = ' .:;ilwW@';
const labelLayer = t.layers.add();
const moveHistory = [];
let moveCount = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.mouseMoved(() => {
	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		moveCount++;
		moveHistory.unshift({ x: t.mouse.x, y: t.mouse.y, life: 1.0 });
		if (moveHistory.length > 20) moveHistory.length = 20;
	}
});

t.draw(() => {
	t.background(2, 11, 8);
	for (let i = moveHistory.length - 1; i >= 0; i--) {
		if ((moveHistory[i].life -= 0.025) <= 0) moveHistory.splice(i, 1);
	}
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	const sweepAngle = (t.frameCount * 0.04) % (Math.PI * 2);

	for (let y = -hh; y <= hh; y += 1) {
		for (let x = -hw; x <= hw; x += 1) {
			const elevation = (Math.sin(x * 0.1 + y * 0.05) + Math.cos(x * 0.05 - y * 0.1) + 2) * 0.25;
			let angleDiff = Math.abs(Math.atan2(y, x) + Math.PI - sweepAngle);
			if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
			const sweepVal = angleDiff < 0.15 ? (1 - angleDiff / 0.15) * 0.6 : 0;

			let maxHeat = 0;
			for (let i = 0; i < moveHistory.length; i++) {
				const n = moveHistory[i],
					d = Math.hypot(x - n.x, y - n.y);
				if (d < 12) maxHeat = Math.max(maxHeat, (1 - d / 12) * n.life);
			}

			const val = Math.min(1, elevation * 0.35 + sweepVal + maxHeat * 0.85);
			if (val > 0.08) {
				const charIdx = Math.min(RAMP.length - 1, Math.floor(val * RAMP.length));
				t.push();
				t.translate(x, y);
				if (maxHeat > 0.4) {
					t.charColor(204, 255, 0);
					t.cellColor(20, 45, 10);
				} else if (sweepVal > 0.2) {
					t.charColor(0, 229, 255);
				} else {
					const b = val;
					t.charColor(Math.floor(8 + b * 20), Math.floor(36 + b * 90), Math.floor(27 + b * 70));
				}
				t.char(RAMP[charIdx]);
				t.point();
				t.pop();
			}
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MOUSEMOVED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PASSIVE MOVEMENT EVENT', x, y++, 100, 220, 255);
	drawText('Fires on hover without clicking.', x, y++, 140, 160, 190);
	drawText('Hovering leaves phosphor sonar trails.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('MOVE EVENTS: ' + moveCount, x, y++, 140, 255, 180);
	drawText('TRAIL NODES: ' + moveHistory.length, x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
