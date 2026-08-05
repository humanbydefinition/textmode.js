/**
 * @title Textmodifier.mouseDragged
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add();
const particles = [];
let dragCount = 0;
let isDragging = false;

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

t.mouseDragged(() => {
	if (t.mouse.x === Number.NEGATIVE_INFINITY) return;
	isDragging = true;
	dragCount++;
	const vx = (t.mouse.x - t.pmouse.x) * 0.3;
	const vy = (t.mouse.y - t.pmouse.y) * 0.3;
	particles.unshift({ x: t.mouse.x, y: t.mouse.y, vx, vy, life: 1 });
	if (particles.length > 80) particles.length = 80;
});

t.draw(() => {
	t.background(8, 12, 20);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.02;

	for (let y = -hh; y <= hh; y += 3) {
		for (let x = -hw; x <= hw; x += 3) {
			const a = Math.sin(x * 0.08 + tm) + Math.cos(y * 0.08 - tm * 0.8);
			t.push();
			t.translate(x, y);
			t.charColor(14, 56, 43);
			t.char(a > 1.0 ? '/' : a > 0.2 ? '|' : a > -0.8 ? '\\' : '-');
			t.point();
			t.pop();
		}
	}

	for (let i = particles.length - 1; i >= 0; i--) {
		const p = particles[i];
		p.x += p.vx;
		p.y += p.vy;
		p.vx *= 0.94;
		p.vy *= 0.94;
		const a = Math.sin(p.x * 0.08 + tm) + Math.cos(p.y * 0.08 - tm * 0.8);
		p.vx += Math.cos(a) * 0.05;
		p.vy += Math.sin(a) * 0.05;
		if ((p.life -= 0.02) <= 0) {
			particles.splice(i, 1);
			continue;
		}
		const px = Math.round(p.x);
		const py = Math.round(p.y);
		if (px >= -hw && px <= hw && py >= -hh && py <= hh) {
			t.push();
			t.translate(px, py);
			t.charColor(p.life > 0.6 ? 163 : 57, p.life > 0.6 ? 255 : p.life > 0.3 ? 255 : 90, p.life > 0.6 ? 206 : 20);
			if (p.life > 0.3) t.cellColor(p.life > 0.6 ? 20 : 10, p.life > 0.6 ? 80 : 40, p.life > 0.6 ? 50 : 25);
			t.char(p.life > 0.6 ? '█' : p.life > 0.3 ? '▓' : '░');
			t.point();
			t.pop();
		}
	}
	if (!t.mouseIsPressed) isDragging = false;
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MOUSEDRAGGED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CONTINUOUS DRAG EVENT', x, y++, 100, 220, 255);
	drawText('Fires continuously while dragging.', x, y++, 140, 160, 190);
	drawText('Injects fluid particle streamlines.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('DRAG EVENTS: ' + dragCount, x, y++, 140, 255, 180);
	drawText('DRAGGING:    ' + (isDragging ? 'TRUE' : 'FALSE'), x, y++, 180, 200, 220);
	drawText('PARTICLES:   ' + particles.length, x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
