/**
 * @title Textmodifier.mouseClicked
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const RAMP = ' .:=+*#%@';
const labelLayer = t.layers.add();
const ripples = [];
let clickCount = 0;
let lastPos = 'NONE';

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.mouseClicked(() => {
	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		clickCount++;
		lastPos = `(${t.mouse.x}, ${t.mouse.y})`;
		ripples.unshift({ x: t.mouse.x, y: t.mouse.y, age: 0, maxAge: 60 });
		if (ripples.length > 12) ripples.length = 12;
	}
});

t.draw(() => {
	t.background(10, 8, 24);
	for (let i = ripples.length - 1; i >= 0; i--) {
		if (++ripples[i].age >= ripples[i].maxAge) ripples.splice(i, 1);
	}
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2),
		tm = t.frameCount * 0.04;
	for (let y = -hh; y <= hh; y += 1) {
		for (let x = -hw; x <= hw; x += 1) {
			const ambient = (Math.sin(x * 0.15 + tm) * Math.cos(y * 0.15 - tm * 0.8) + 1) * 0.2;
			let rippleVal = 0;
			for (let i = 0; i < ripples.length; i++) {
				const rip = ripples[i],
					d = Math.hypot(x - rip.x, y - rip.y),
					rad = rip.age * 0.75;
				const dist = Math.abs(d - rad);
				if (dist < 3.5) rippleVal += Math.cos((dist / 3.5) * Math.PI * 0.5) * (1 - rip.age / rip.maxAge);
			}
			const val = Math.min(1, ambient + rippleVal);
			if (val > 0.08) {
				const charIdx = Math.min(RAMP.length - 1, Math.floor(val * RAMP.length));
				t.push();
				t.translate(x, y);
				if (rippleVal > 0.3) {
					const g = Math.min(1, (rippleVal - 0.3) / 0.7);
					t.charColor(Math.floor(220 + g * 35), Math.floor(170 + g * 85), Math.floor(51 + g * 204));
					t.cellColor(Math.floor(40 * g), Math.floor(20 * g), Math.floor(60 * g));
				} else {
					const b = val / 0.5;
					t.charColor(Math.floor(26 + b * 20), Math.floor(58 + b * 50), Math.floor(75 + b * 60));
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
	drawText('TEXTMODIFIER.MOUSECLICKED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DISCRETE CLICK EVENT', x, y++, 100, 220, 255);
	drawText('Fires once per press & release.', x, y++, 140, 160, 190);
	drawText('Clicking injects wave discharge.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('TOTAL CLICKS: ' + clickCount, x, y++, 140, 255, 180);
	drawText('LAST CLICK:   ' + lastPos, x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
