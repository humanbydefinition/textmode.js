/**
 * @title Textmodifier.requestPointerLock
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add();
let rotX = 0,
	rotY = 0;

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

t.mouseClicked(() => {
	if (document.pointerLockElement === t.canvas) t.exitPointerLock();
	else t.requestPointerLock();
});

t.draw(() => {
	t.background(5, 8, 10);
	const isLocked = document.pointerLockElement === t.canvas;

	if (isLocked) {
		rotX += t.movedX * 0.35;
		rotY += t.movedY * 0.35;
	} else {
		rotX += 0.25;
	}

	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	const rad = Math.floor(Math.min(hw, hh) * 0.65);
	const angleOffset = (rotX * 0.05) % (Math.PI * 2);

	for (let y = -hh; y <= hh; y += 1) {
		for (let x = -hw; x <= hw; x += 1) {
			const d = Math.hypot(x, y * 1.4);
			const cellAngle = Math.atan2(y * 1.4, x) + Math.PI;

			let isRing = Math.abs(d - rad) < 0.8 || Math.abs(d - rad * 0.5) < 0.8;
			let isAxis = (x === 0 && Math.abs(y) <= rad + 2) || (y === 0 && Math.abs(x) <= rad + 2);
			let isTick = isRing && Math.abs((cellAngle + angleOffset) % (Math.PI / 4)) < 0.08;

			if (isRing || isAxis || isTick) {
				t.push();
				t.translate(x, y);

				if (isLocked) {
					if (d < 3) {
						t.charColor(255, 51, 51);
						t.cellColor(90, 0, 0);
						t.char('+');
					} else if (isTick) {
						t.charColor(255, 200, 0);
						t.char('#');
					} else {
						t.charColor(255, 153, 0);
						t.char(isAxis ? (x === 0 ? '|' : '-') : '*');
					}
				} else {
					t.charColor(68, 85, 102);
					t.char(isAxis ? '+' : '.');
				}

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
	const isLocked = document.pointerLockElement === t.canvas;

	drawText('TEXTMODIFIER.REQUESTPOINTERLOCK', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: 360 DEGREE POINTER LOCK', x, y++, 100, 220, 255);
	drawText('Click canvas to toggle pointer lock.', x, y++, 140, 160, 190);
	drawText('Captures unconstrained movedX/movedY.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('POINTER LOCK: ' + (isLocked ? 'LOCKED' : 'UNLOCKED'), x, y++, 140, 255, 180);
	drawText('ACCUMULATED ROTATION X: ' + rotX.toFixed(1), x, y++, 180, 200, 220);
	drawText('ACCUMULATED ROTATION Y: ' + rotY.toFixed(1), x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
