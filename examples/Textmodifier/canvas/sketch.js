/**
 * @title Textmodifier.canvas
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.canvas.title = 'Textmodifier.canvas';
t.canvas.dataset.example = 'canvas';
t.canvas.style.outlineOffset = '-4px';

t.draw(() => {
	const hue = Math.floor((t.frameCount * 2) % 360);
	t.canvas.style.outline = `3px solid hsl(${hue}, 90%, 62%)`;
	t.canvas.style.boxShadow = `0 0 24px hsla(${hue}, 90%, 62%, 0.28)`;

	t.background(6, 8, 20);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const left = -hw + 1;
	const right = hw - 1;
	const top = -hh;
	const bottom = hh - 1;

	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			const dist = Math.hypot(x, y);
			const matrixVal =
				(Math.sin(x * 0.2 + t.frameCount * 0.05) + Math.cos(y * 0.2 - t.frameCount * 0.05)) * 0.5 + 0.5;

			t.push();
			t.translate(x, y);

			if (x === left || x === right || y === top || y === bottom) {
				t.charColor(255, 190, 80);
				t.cellColor(40, 25, 10);
				t.char('#');
			} else if (dist < 8) {
				t.charColor(100, 220, 255);
				t.cellColor(15, 35, 50);
				t.char('=');
			} else {
				t.charColor(
					Math.floor(20 + matrixVal * 60),
					Math.floor(40 + matrixVal * 120),
					Math.floor(80 + matrixVal * 140)
				);
				t.cellColor(6, 8, 20);
				t.char(matrixVal > 0.6 ? '+' : '.');
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
	t.print('TEXTMODIFIER.CANVAS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: DOM CANVAS ELEMENT ACCESS', x, y++);
	t.charColor(140, 160, 190);
	t.print('t.canvas returns HTMLCanvasElement.', x, y++);
	t.print('CSS outline & shadow update live.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 190, 80);
	t.print(`ELEMENT SIZE: ${t.canvas.width}x${t.canvas.height}`, x, y++);
	t.charColor(140, 255, 200);
	t.print(`TITLE: ${t.canvas.title}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
