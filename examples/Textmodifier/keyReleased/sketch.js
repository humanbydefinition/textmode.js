/**
 * @title Textmodifier.keyReleased
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add(),
	cascades = [];
let releaseCount = 0,
	lastReleased = 'NONE';

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

t.keyReleased((data) => {
	releaseCount++;
	const k = data.key || 'KEY';
	lastReleased = k;
	const ch = k.length === 1 ? k : '♦';

	for (let i = 0; i < 18; i++) {
		const a = (i / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
		const s = 0.5 + Math.random() * 1.1;
		cascades.unshift({ x: 0, y: 0, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1.0, char: ch });
	}
	if (cascades.length > 90) cascades.length = 90;
});

t.draw(() => {
	t.background(6, 8, 16);
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);

	// Central energy crystal
	const tm = t.frameCount * 0.04;
	const pulse = (Math.sin(tm) + 1) * 0.5;
	t.push();
	t.translate(0, 0);
	t.charColor(0, Math.floor(180 + pulse * 75), 255);
	t.cellColor(0, 40, 80);
	t.char('♦');
	t.point();
	t.pop();

	// Dissipation particle cascades
	for (let i = cascades.length - 1; i >= 0; i--) {
		const c = cascades[i];
		c.x += c.vx;
		c.y += c.vy;
		c.vx *= 0.94;
		c.vy *= 0.94;
		if ((c.life -= 0.02) <= 0) {
			cascades.splice(i, 1);
			continue;
		}

		const cx = Math.round(c.x),
			cy = Math.round(c.y);
		if (cx >= -hw && cx <= hw && cy >= -hh && cy <= hh) {
			t.push();
			t.translate(cx, cy);
			if (c.life > 0.6) {
				t.charColor(255, 204, 0);
				t.cellColor(70, 50, 0);
			} else {
				t.charColor(0, Math.floor(100 + c.life * 155), 200);
			}
			t.char(c.life > 0.7 ? c.char : c.life > 0.4 ? '∙' : '·');
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

	drawText('TEXTMODIFIER.KEYRELEASED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: UP-STROKE RELEASE CASCADE', x, y++, 100, 220, 255);
	drawText('Fires on key release up-stroke.', x, y++, 140, 160, 190);
	drawText('Key release dissipates energy cascades.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('KEY RELEASES:  ' + releaseCount, x, y++, 140, 255, 180);
	drawText('LAST RELEASED: ' + lastReleased, x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
