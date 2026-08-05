/**
 * @title Textmodifier.mouseReleased
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add();
const sparks = [];
let tension = 0,
	releaseCount = 0,
	lastPos = 'NONE';

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

t.mouseReleased(() => {
	if (t.mouse.x === Number.NEGATIVE_INFINITY) return;
	releaseCount++;
	lastPos = `(${t.mouse.x}, ${t.mouse.y})`;
	for (let i = 0; i < 14; i++) {
		const a = (i / 14) * Math.PI * 2,
			s = (0.8 + Math.random()) * (0.4 + tension * 0.8);
		sparks.unshift({ x: t.mouse.x, y: t.mouse.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 });
	}
	tension = 0;
	if (sparks.length > 70) sparks.length = 70;
});

t.draw(() => {
	t.background(8, 8, 16);
	const isHeld = t.mouseIsPressed && t.mouse.x !== Number.NEGATIVE_INFINITY;
	tension = isHeld ? Math.min(1, tension + 0.04) : Math.max(0, tension - 0.08);
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);

	for (let y = -hh; y <= hh; y += 2) {
		for (let x = -hw; x <= hw; x += 2) {
			const d = isHeld ? Math.hypot(x - t.mouse.x, y - t.mouse.y) : 999;
			const pull = d < 20 ? (1 - d / 20) * tension * 3 : 0;
			const rx = Math.round(x + (isHeld ? (t.mouse.x - x) * (pull / (d + 1)) : 0));
			const ry = Math.round(y + (isHeld ? (t.mouse.y - y) * (pull / (d + 1)) : 0));
			if (rx >= -hw && rx <= hw && ry >= -hh && ry <= hh) {
				t.push();
				t.translate(rx, ry);
				t.charColor(pull > 0.4 ? 255 : 30, pull > 0.4 ? Math.floor(100 + pull * 155) : 40, pull > 0.4 ? 0 : 70);
				if (pull > 0.4) t.cellColor(80, 20, 0);
				t.char(pull > 0.4 ? '#' : '+');
				t.point();
				t.pop();
			}
		}
	}

	for (let i = sparks.length - 1; i >= 0; i--) {
		const s = sparks[i];
		s.x += s.vx;
		s.y += s.vy;
		s.vx *= 0.93;
		s.vy *= 0.93;
		if ((s.life -= 0.025) <= 0) {
			sparks.splice(i, 1);
			continue;
		}
		const sx = Math.round(s.x),
			sy = Math.round(s.y);
		if (sx >= -hw && sx <= hw && sy >= -hh && sy <= hh) {
			t.push();
			t.translate(sx, sy);
			t.charColor(s.life > 0.6 ? 255 : 0, s.life > 0.6 ? 255 : 235, 255);
			if (s.life > 0.5) t.cellColor(0, 70, 90);
			t.char(s.life > 0.7 ? '@' : s.life > 0.4 ? 'O' : '*');
			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MOUSERELEASED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: UP-STROKE RELEASE EVENT', x, y++, 100, 220, 255);
	drawText('Fires on mouse button release.', x, y++, 140, 160, 190);
	drawText('Releasing launches kinetic spark burst.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('TOTAL RELEASES: ' + releaseCount, x, y++, 140, 255, 180);
	drawText('LAST RELEASE:   ' + lastPos, x, y++, 180, 200, 220);
	drawText('TENSION CHARGE: ' + Math.floor(tension * 100) + '%', x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
