/**
 * @title Textmodifier.pmouse
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add(),
	trail = [];

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

t.draw(() => {
	t.background(10, 14, 23);
	const mx = t.mouse.x,
		my = t.mouse.y,
		px = t.pmouse.x,
		py = t.pmouse.y;
	const isInside = mx !== Number.NEGATIVE_INFINITY && px !== Number.NEGATIVE_INFINITY;

	if (isInside) {
		const spd = Math.hypot(mx - px, my - py);
		trail.unshift({ x: mx, y: my, speed: spd, life: 1.0 });
		if (trail.length > 35) trail.length = 35;
	}

	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2),
		tm = t.frameCount * 0.02;

	for (let y = -hh; y <= hh; y += 3) {
		for (let x = -hw; x <= hw; x += 3) {
			const a = Math.sin(x * 0.08 + tm) + Math.cos(y * 0.08 - tm);
			t.push();
			t.translate(x, y);
			t.charColor(24, 35, 60);
			t.char(a > 0.8 ? '/' : a > 0 ? '|' : a > -0.8 ? '\\' : '-');
			t.point();
			t.pop();
		}
	}

	for (let i = trail.length - 1; i >= 0; i--) {
		const node = trail[i];
		if ((node.life -= 0.025) <= 0) {
			trail.splice(i, 1);
			continue;
		}
		const nx = Math.round(node.x),
			ny = Math.round(node.y);
		if (nx >= -hw && nx <= hw && ny >= -hh && ny <= hh) {
			t.push();
			t.translate(nx, ny);
			if (node.speed > 3.0) {
				t.charColor(255, 255, 255);
				t.cellColor(0, 140, 200);
				t.char('█');
			} else if (node.speed > 1.0) {
				t.charColor(0, 212, 255);
				t.cellColor(0, 50, 80);
				t.char('▓');
			} else {
				t.charColor(60, 130, 190);
				t.char('▒');
			}
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
	const mx = t.mouse.x,
		my = t.mouse.y,
		px = t.pmouse.x,
		py = t.pmouse.y;
	const isInside = mx !== Number.NEGATIVE_INFINITY;

	drawText('TEXTMODIFIER.PMOUSE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PREVIOUS POINTER VECTOR', x, y++, 100, 220, 255);
	drawText('Reads previous frame coordinates.', x, y++, 140, 160, 190);
	drawText('Calculates motion speed & vector stroke.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CURRENT POS:  ' + (isInside ? `(${mx}, ${my})` : 'OUTSIDE'), x, y++, 140, 255, 180);
	drawText('PREVIOUS POS: ' + (isInside ? `(${px}, ${py})` : 'OUTSIDE'), x, y++, 180, 200, 220);
	drawText('MOTION SPEED: ' + (isInside ? Math.hypot(mx - px, my - py).toFixed(2) : '0.00'), x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
