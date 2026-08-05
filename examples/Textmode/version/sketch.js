/**
 * @title Textmode.version
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const v = textmode.version;
const label = t.layers.add();
const len = v.length;
const PALETTE = [
	[255, 90, 90],
	[90, 255, 130],
	[90, 180, 255],
	[255, 210, 60],
	[210, 90, 255],
	[60, 240, 220],
];

let px = 3;
let py = 2;
let dx = 0.32;
let dy = 0.22;
let ci = 0;

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(8, 10, 26);
	const C = Math.floor(t.grid.cols / 2);
	const R = Math.floor(t.grid.rows / 2);

	for (let x = -C; x <= C; x += 4)
		for (let y = -R; y <= R; y += 3)
			if ((x * 7 + y * 13) % 19 === 0) {
				t.push();
				t.translate(x, y);
				t.charColor(18, 26, 52);
				t.char('.');
				t.point();
				t.pop();
			}

	px += dx;
	py += dy;

	const left = -C;
	const top = -R;
	let bounced = false;

	if (px < left + 1) {
		px = left + 1;
		dx = Math.abs(dx);
		bounced = true;
	}
	if (px + len > C - 1) {
		px = C - len - 1;
		dx = -Math.abs(dx);
		bounced = true;
	}
	if (py < top + 1) {
		py = top + 1;
		dy = Math.abs(dy);
		bounced = true;
	}
	if (py > R - 2) {
		py = R - 2;
		dy = -Math.abs(dy);
		bounced = true;
	}

	if (bounced) ci = (ci + 1) % PALETTE.length;

	t.printAlign('left', 'top');
	t.charColor(PALETTE[ci][0], PALETTE[ci][1], PALETTE[ci][2]);
	t.print(v, Math.round(px), Math.round(py));
});

label.draw(() => {
	t.clear();
	const L = -Math.floor(t.grid.cols / 2),
		T = -Math.floor(t.grid.rows / 2);
	let y = T + 3;
	drawText('TEXTMODE.VERSION', L + 3, y++, [100, 255, 140]);
	drawText('------------------------------------', L + 3, y++, [80, 100, 150]);
	drawText('CONCEPT: BOUNCING VERSION', L + 3, y++, [100, 220, 255]);
	drawText(`Bounces: ${ci}`, L + 3, y++, [140, 160, 190]);
	drawText('------------------------------------', L + 3, y++, [80, 100, 150]);
	drawText(`VERSION: ${v}`, L + 3, y++, [140, 255, 180]);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
