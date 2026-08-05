/**
 * @title Textmodifier.deltaTime
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let orbX = 0;
let orbY = 0;
let vx = 1.2;
let vy = 0.8;
let dt = 16.6;

t.draw(() => {
	t.background(10, 14, 30);
	dt = t.deltaTime();
	const sec = dt * 0.001;

	orbX += vx * sec * 25;
	orbY += vy * sec * 25;

	if (Math.abs(orbX) > 18) vx *= -1;
	if (Math.abs(orbY) > 10) vy *= -1;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const trailRamp = '@#*:.';

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x - orbX, y - orbY);
			const norm = Math.max(0, 1 - dist / 12);
			const idx = Math.min(trailRamp.length - 1, Math.floor((1 - norm) * trailRamp.length));

			t.push();
			t.translate(x, y);

			if (dist < 1.5) {
				t.charColor(255, 220, 80);
				t.cellColor(40, 35, 10);
				t.char('@');
			} else {
				t.charColor(Math.floor(20 + norm * 180), Math.floor(60 + norm * 160), Math.floor(120 + norm * 135));
				t.cellColor(10, 14, 30);
				t.char(trailRamp[idx]);
			}

			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.DELTATIME', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: FRAME-INDEPENDENT KINETICS', x, y++);
	t.charColor(140, 160, 190);
	t.print('deltaTime() scales velocity updates.', x, y++);
	t.print('Physics speed remains constant.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`DELTA TIME: ${dt.toFixed(2)} MS`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
