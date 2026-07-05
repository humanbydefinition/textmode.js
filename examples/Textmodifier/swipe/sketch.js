/**
 * @title Textmodifier.swipe
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const particles = [];
let last = 'NONE';
let sx = 0;
let sy = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function launch(dx, dy) {
	last = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'RIGHT' : 'LEFT') : dy > 0 ? 'DOWN' : 'UP';
	for (let i = 0; i < 8; i++) particles.push({ x: 0, y: 0, vx: dx * (1 + i * 0.1), vy: dy * (1 + i * 0.1), life: 1 });
}

t.swipe((data) => {
	launch(data.direction.x, data.direction.y);
});

t.mousePressed(() => {
	sx = t.mouse.x;
	sy = t.mouse.y;
});

t.mouseReleased(() => {
	const dx = t.mouse.x - sx;
	const dy = t.mouse.y - sy;
	const len = Math.hypot(dx, dy);
	if (len > 4) launch(dx / len, dy / len);
});

t.draw(() => {
	t.background(6, 10, 22);
	for (let i = particles.length - 1; i >= 0; i--) {
		const p = particles[i];
		p.x += p.vx;
		p.y += p.vy;
		p.life -= 0.025;
		if (p.life <= 0) particles.splice(i, 1);
		t.push();
		t.translate(p.x, p.y);
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
	drawText('TEXTMODIFIER.SWIPE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SWIPE DIRECTION', x, y++, 100, 220, 255);
	drawText('Swipe or drag/release.', x, y++, 140, 160, 190);
	drawText('Particles follow direction.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('LAST: ' + last, x, y++, 140, 255, 180);
	drawText(`ACTIVE: ${particles.length}`, x, y++, 180, 200, 220);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
