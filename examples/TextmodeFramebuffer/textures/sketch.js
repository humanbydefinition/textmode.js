/**
 * @title TextmodeFramebuffer.textures
 * @author codex
 * @description Inspects the array of WebGLTexture attachments containing character and color buffers.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 });
const fb = t.createFramebuffer({ width: 36, height: 18 });
const HEX = '0123456789ABCDEF',
	STREAM = ['.', ':', '*', '#'];
const VIEWS = ['Composite (All 3)', 'Tex 0 (Char Data)', 'Tex 1 (Char Color)', 'Tex 2 (Cell Color)'];
const LABELS = ['CHR/GEO ', 'CHR-COLR', 'CEL-COLR'];
let view = 0,
	ex = 0,
	ey = 0;
const nextView = () => {
	view = (view + 1) % 4;
};
t.mouseClicked(nextView);
t.keyPressed((e) => {
	if (e?.key === ' ' || e?.code === 'Space') nextView();
});

const particles = Array.from({ length: 32 }, (_, i) => ({
	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
	life: (i / 32) * 30,
	max: 28 + (i % 12),
	id: i,
}));

t.draw(() => {
	const hasMouse = Number.isFinite(t.mouse.x) && Number.isFinite(t.mouse.y);
	ex = (hasMouse ? t.mouse.x * 0.35 : 0) + Math.sin(t.secs * 1.6) * (hasMouse ? 2 : 12);
	ey = (hasMouse ? t.mouse.y * 0.35 : 0) + Math.cos(t.secs * 1.2) * (hasMouse ? 1.5 : 5);
	const hw = Math.floor(fb.width / 2),
		hh = Math.floor(fb.height / 2);

	fb.begin();
	t.clear();
	t.background(12, 6, 22);
	for (let gx = -15; gx <= 15; gx += 5)
		for (let gy = -7; gy <= 7; gy += 4) {
			t.push();
			t.translate(gx, gy);
			t.char(HEX[(Math.abs(gx + gy) + Math.floor(t.secs * 3)) % 16]);
			t.charColor(30, 14, 44);
			t.point();
			t.pop();
		}
	t.push();
	t.translate(Math.round(ex), Math.round(ey));
	t.char('+');
	t.charColor(255, 225, 250);
	t.point();
	t.pop();
	for (const p of particles) {
		const a = Math.sin(p.x * 0.2 + t.secs) * 2 + Math.cos(p.y * 0.2) * 1.5;
		p.vx = (p.vx + Math.cos(a) * 0.08) * 0.94;
		p.vy = (p.vy + Math.sin(a) * 0.08) * 0.94;
		p.x += p.vx;
		p.y += p.vy;
		if (++p.life > p.max || Math.abs(p.x) > 16 || Math.abs(p.y) > 8) {
			p.life = 0;
			p.x = ex;
			p.y = ey;
			const b = (p.id / 32) * Math.PI * 2 + t.secs,
				sp = 0.4 + (p.id % 4) * 0.1;
			p.vx = Math.cos(b) * sp;
			p.vy = Math.sin(b) * sp;
		}
		const ch =
			p.id % 2 === 0
				? HEX[(p.id + Math.floor(t.frameCount * 0.1)) % 16]
				: STREAM[Math.floor((p.life / p.max) * 3.9)];
		t.push();
		t.translate(Math.round(p.x), Math.round(p.y));
		t.char(view === 3 ? ' ' : view === 2 ? '#' : ch);
		if (view === 1) t.charColor(255, 225, 250);
		else if (view !== 3) t.charColor(p.id % 2 ? 75 : 245, p.id % 2 ? 200 : 75, p.id % 2 ? 255 : 200);
		if (view === 3) t.cellColor(p.id % 2 ? 25 : 90, p.id % 2 ? 60 : 20, p.id % 2 ? 120 : 110);
		else if (view === 0) t.cellColor(28, 12, 45, 180);
		t.point();
		t.pop();
	}
	fb.end();

	t.background(12, 6, 22);
	const ox = t.grid.cols > 72 ? 14 : 0,
		oy = -3;
	t.push();
	t.translate(ox, oy);
	t.image(fb);
	t.pop();
	for (let i = 0; i < fb.textures.length; i++) {
		const act = view === 0 || view === i + 1;
		[`+-- TEX[${i}] --+`, `| ${LABELS[i]} |`, `| ${act ? ' ACTIVE ' : 'RGBA8.OK'} |`, '+----------+'].forEach(
			(line, r) => {
				t.push();
				t.translate(ox + (i - 1) * 13, oy + hh + 2 + r);
				t.charColor(
					act ? (i === 1 ? 75 : 245) : 75,
					act ? (i === 1 ? 200 : 75) : 40,
					act ? (i === 0 ? 200 : 255) : 85
				);
				t.cellColor(10, 14, 24, 220);
				t.print(line, 0, 0);
				t.pop();
			}
		);
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	const tex = fb.textures;
	const state = (i) => (tex[i] instanceof WebGLTexture ? 'BOUND' : 'NULL');
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 14, 24, 220);
	// Inline colors keep the complete telemetry panel in one text block.
	const panel = `[fg=#f54bc8]FRAMEBUFFER TEXTURES[/fg]
[fg=#783ca0]------------------------------------[/fg]
[fg=#ffe1fa]ATTACHMENTS: ${tex.length} WebGLTexture targets[/fg]
[fg=#4bc8ff]ACTIVE VIEW: [${view}] ${VIEWS[view]}[/fg]
[fg=#783ca0]------------------------------------[/fg]
[fg=#f54bc8]TEX[0]: ${state(0)} - CHAR DATA[/fg]
[fg=#4bc8ff]TEX[1]: ${state(1)} - CHAR COLOR[/fg]
[fg=#f54bff]TEX[2]: ${state(2)} - CELL COLOR[/fg]
[fg=#783ca0]------------------------------------[/fg]
[fg=#dce6ff]EMITTER: (${Math.round(ex)}, ${Math.round(ey)}) - PARTICLES: ${particles.length}[/fg]
[fg=#f54bc8]CLICK / SPACE: CYCLE ATTACHMENTS[/fg]
[fg=#4bc8ff]MOUSE: STEER FLOW FIELD[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
