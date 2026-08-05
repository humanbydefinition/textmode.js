/**
 * @title Textmodifier.doubleClicked
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const shockwaves = [];
let doubleClickCount = 0;

t.doubleClicked(() => {
	doubleClickCount++;
	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		shockwaves.push({ x: t.mouse.x, y: t.mouse.y, radius: 0, maxRadius: 28 });
		if (shockwaves.length > 6) shockwaves.shift();
	}
});

t.draw(() => {
	t.background(6, 8, 20);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	for (let i = shockwaves.length - 1; i >= 0; i--) {
		shockwaves[i].radius += 0.4;
		if (shockwaves[i].radius > shockwaves[i].maxRadius) {
			shockwaves.splice(i, 1);
		}
	}

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			let shockIntensity = 0;

			for (const wave of shockwaves) {
				const dist = Math.hypot(x - wave.x, y - wave.y);
				if (Math.abs(dist - wave.radius) < 1.5) {
					shockIntensity = Math.max(shockIntensity, 1 - Math.abs(dist - wave.radius) / 1.5);
				}
			}

			t.push();
			t.translate(x, y);

			if (shockIntensity > 0.6) {
				t.charColor(255, 220, 80);
				t.cellColor(45, 30, 10);
				t.char('@');
			} else if (shockIntensity > 0.2) {
				t.charColor(100, 220, 255);
				t.cellColor(15, 35, 50);
				t.char('*');
			} else {
				const bgVal = (Math.sin(x * 0.2) + Math.cos(y * 0.2)) * 0.5 + 0.5;
				t.charColor(20, 35, 60);
				t.cellColor(6, 8, 20);
				t.char(bgVal > 0.6 ? '+' : '.');
			}

			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 1;
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.DOUBLECLICKED', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: DOUBLE-CLICK SHOCKWAVE TRIGGER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Double-click canvas to emit shockwaves.', x, y++);
	t.print('Propagates radial energy outward.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 200, 80);
	t.print(`DOUBLE-CLICKS: ${doubleClickCount}`, x, y++);
	t.charColor(140, 255, 200);
	t.print(`ACTIVE WAVES: ${shockwaves.length}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
