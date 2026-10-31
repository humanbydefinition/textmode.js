/**
 * @title TextmodeFramebuffer.width
 * @author codex
 * @description Demonstrates reading and adapting to offscreen framebuffer width in grid cell columns.
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add({ fontSize: 16 });
let targetW = 28,
	userTimer = 0;
const fb = t.createFramebuffer({ width: targetW, height: 12 });

const setTarget = (fn) => {
	const maxW = Math.min(48, Math.max(16, Math.floor(t.grid.cols * 0.72)));
	targetW = Math.max(12, Math.min(maxW, fn(maxW)));
	userTimer = 180;
};
t.mouseScrolled((e) => setTarget(() => targetW - Math.sign(e.delta.y) * 2));
t.mouseClicked(() => setTarget((max) => (targetW >= max - 2 ? 14 : targetW + 4)));

t.draw(() => {
	t.background(8, 22, 46);
	const time = t.frameCount * 0.04;
	if (userTimer > 0) userTimer--;
	else {
		const maxW = Math.min(44, Math.max(16, Math.floor(t.grid.cols * 0.7)));
		targetW = Math.round(14 + (Math.sin(time) * 0.5 + 0.5) * (maxW - 14));
	}
	if (fb.width !== targetW) fb.resize(targetW, 12);

	const w = fb.width,
		hw = Math.floor(w / 2),
		hh = Math.floor(fb.height / 2);
	fb.begin();
	t.clear();
	t.background(8, 22, 46);
	const sweep = Math.floor(Math.sin(time * 1.8) * (hw - 1));
	for (let y = -hh + 1; y <= hh - 1; y++) {
		for (let x = -hw; x <= hw; x++) {
			const isBay = (x + hw) % 4 === 0,
				isFlange = y === -hh + 1 || y === hh - 1;
			const lit = Math.abs(x - sweep) <= 1;
			t.push();
			t.translate(x, y);
			t.charColor(lit ? 240 : isBay ? 120 : 55, lit ? 248 : isBay ? 195 : 115, lit ? 255 : isBay ? 255 : 195);
			t.char(isFlange ? '#' : isBay ? (lit ? '*' : '+') : (x + y) % 2 === 0 ? 'x' : '.');
			t.point();
			t.pop();
		}
	}
	fb.end();

	t.image(fb);

	const dimY = -hh - 2;
	t.push();
	t.printAlign('center', 'middle');
	t.charColor(120, 195, 255);
	t.cellColor(8, 22, 46, 220);
	t.print('+' + '-'.repeat(Math.max(0, w - 2)) + '+', 0, dimY);
	t.charColor(240, 248, 255);
	t.print(` WIDTH: ${w} COLS `, 0, dimY);
	t.charColor(55, 115, 195);
	t.print(`SPAN [-${hw}..+${hw}]`, 0, hh + 2);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	let y = top;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(8, 22, 46, 220);
	t.charColor(240, 248, 255);
	t.print('TEXTMODEFRAMEBUFFER.WIDTH', left, y++);
	t.charColor(55, 115, 195);
	t.print('------------------------------------', left, y++);
	t.charColor(120, 195, 255);
	t.print(`FB COLS   : ${fb.width} CELLS`, left, y++);
	t.print(`FB PIXELS : ${fb.width * 16} PX`, left, y++);
	t.charColor(55, 115, 195);
	t.print('WHEEL/CLICK: SCRUB | IDLE: PULSE', left, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
