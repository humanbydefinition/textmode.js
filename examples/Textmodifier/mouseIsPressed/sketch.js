/**
 * @title Textmodifier.mouseIsPressed
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const RAMP = '+xX#░▒▓█';
const labelLayer = t.layers.add();
let pressure = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(5, 5, 10);
	const isHeld = t.mouseIsPressed && t.mouse.x !== Number.NEGATIVE_INFINITY;
	pressure += ((isHeld ? 1.0 : 0.0) - pressure) * 0.12;

	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03,
		mx = t.mouse.x,
		my = t.mouse.y;

	for (let y = -hh; y <= hh; y += 1) {
		for (let x = -hw; x <= hw; x += 1) {
			const wave = (Math.sin(x * 0.12 + tm) + Math.cos(y * 0.12 - tm)) * 0.5 + 0.5;
			let dispX = x,
				dispY = y,
				pullFactor = 0;
			if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
				const dist = Math.hypot(x - mx, y - my);
				if (dist < 22) {
					pullFactor = Math.pow(1 - dist / 22, 2) * pressure;
					dispX = x - (x - mx) * pullFactor * 0.45;
					dispY = y - (y - my) * pullFactor * 0.45;
				}
			}
			const intensity = Math.min(1, wave * 0.4 + pullFactor * 0.85);
			if (intensity > 0.08) {
				const charIdx = Math.min(RAMP.length - 1, Math.floor(intensity * RAMP.length));
				const rx = Math.round(dispX),
					ry = Math.round(dispY);
				if (rx >= -hw && rx <= hw && ry >= -hh && ry <= hh) {
					t.push();
					t.translate(rx, ry);
					if (pullFactor > 0.5) {
						const h = (pullFactor - 0.5) / 0.5;
						t.charColor(255, Math.floor(140 + h * 105), Math.floor(h * 230));
						t.cellColor(Math.floor(120 * h), Math.floor(30 * h), 0);
					} else if (pullFactor > 0.15) {
						const h = (pullFactor - 0.15) / 0.35;
						t.charColor(Math.floor(160 + h * 95), Math.floor(70 + h * 70), Math.floor(30 - h * 30));
					} else {
						const b = intensity;
						t.charColor(Math.floor(28 + b * 22), Math.floor(45 + b * 37), Math.floor(90 + b * 78));
					}
					t.char(RAMP[charIdx]);
					t.point();
					t.pop();
				}
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
	const isHeld = t.mouseIsPressed && t.mouse.x !== Number.NEGATIVE_INFINITY;
	drawText('TEXTMODIFIER.MOUSEISPRESSED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SYNCHRONOUS HOLD STATE', x, y++, 100, 220, 255);
	drawText('Evaluates boolean state every frame.', x, y++, 140, 160, 190);
	drawText('Holding mouse implodes lattice core.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('MOUSE IS PRESSED: ' + (isHeld ? 'TRUE' : 'FALSE'), x, y++, 140, 255, 180);
	drawText('PRESSURE INTENSITY: ' + Math.floor(pressure * 100) + '%', x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
