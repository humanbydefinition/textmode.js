/**
 * @title Textmodifier.isKeyPressed
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add(),
	flames = [];
let px = 0,
	py = 0,
	vx = 0,
	vy = 0,
	active = false;

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 8, 20);
	const up = t.isKeyPressed('ArrowUp') || t.isKeyPressed('w') || t.isKeyPressed('W');
	const down = t.isKeyPressed('ArrowDown') || t.isKeyPressed('s') || t.isKeyPressed('S');
	const left = t.isKeyPressed('ArrowLeft') || t.isKeyPressed('a') || t.isKeyPressed('A');
	const right = t.isKeyPressed('ArrowRight') || t.isKeyPressed('d') || t.isKeyPressed('D');
	const boost = t.isKeyPressed(' ');
	active = up || down || left || right || boost;

	if (up) vy -= 0.2;
	if (down) vy += 0.2;
	if (left) vx -= 0.2;
	if (right) vx += 0.2;
	if (boost) {
		vx *= 1.05;
		vy *= 1.05;
	}

	if (active) flames.unshift({ x: px, y: py, vx: -vx * 0.5, vy: -vy * 0.5, life: 1 });
	if (flames.length > 40) flames.length = 40;

	vx *= 0.91;
	vy *= 0.91;
	px += vx;
	py += vy;
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	px = Math.max(-hw + 5, Math.min(hw - 5, px));
	py = Math.max(-hh + 5, Math.min(hh - 5, py));

	for (let i = flames.length - 1; i >= 0; i--) {
		const f = flames[i];
		f.x += f.vx;
		f.y += f.vy;
		if ((f.life -= 0.04) <= 0) {
			flames.splice(i, 1);
			continue;
		}
		const fx = Math.round(f.x),
			fy = Math.round(f.y);
		if (fx >= -hw && fx <= hw && fy >= -hh && fy <= hh) {
			t.push();
			t.translate(fx, fy);
			t.charColor(255, f.life > 0.5 ? 170 : 80, 0);
			if (f.life > 0.6) t.cellColor(90, 30, 0);
			t.char(f.life > 0.7 ? '█' : f.life > 0.4 ? '▓' : '░');
			t.point();
			t.pop();
		}
	}

	t.push();
	t.translate(Math.round(px), Math.round(py));
	t.charColor(0, boost ? 255 : 170, 255);
	t.cellColor(0, 50, 90);
	t.char(up ? '▲' : down ? '▼' : left ? '◄' : right ? '►' : '♦');
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.ISKEYPRESSED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SYNCHRONOUS KEY HOLD', x, y++, 100, 220, 255);
	drawText('Evaluates held key state every frame.', x, y++, 140, 160, 190);
	drawText('Use Arrows / WASD / Space to thrust.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('THRUSTERS: ' + (active ? 'ENGAGED' : 'IDLE'), x, y++, 140, 255, 180);
	drawText('SPEED:     ' + Math.hypot(vx, vy).toFixed(2), x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
