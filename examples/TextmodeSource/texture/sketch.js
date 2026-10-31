/**
 * @title TextmodeSource.texture
 * @author codex
 * @description Accesses the underlying GPU WebGLTexture instance driven by an interactive procedural canvas.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const cw = 64,
	ch = 36;
const canvas = Object.assign(document.createElement('canvas'), { width: cw, height: ch });
const ctx = canvas.getContext('2d');
const source = t.createTexture(canvas);
source.characters(' .,:;+=xX$#').charColorMode('sampled').cellColorMode('fixed').cellColor(6, 12, 8);
const ripples = [],
	labelLayer = t.layers.add({ fontSize: 16 });
let px = cw / 2,
	py = ch / 2;

t.mouseClicked(() => ripples.push({ x: px, y: py, r: 1, a: 1.2 }));

t.draw(() => {
	t.background(6, 12, 8);
	const time = t.frameCount * 0.04;
	const hasM = Number.isFinite(t.mouse.x) && (t.mouse.x !== 0 || t.mouse.y !== 0);
	const tx = hasM
		? ((t.mouse.x + t.grid.cols / 2) / t.grid.cols) * cw
		: cw * 0.5 + Math.cos(time * 1.4) * (cw * 0.32);
	const ty = hasM
		? ((t.mouse.y + t.grid.rows / 2) / t.grid.rows) * ch
		: ch * 0.5 + Math.sin(time * 2.1) * (ch * 0.32);
	px += (tx - px) * 0.2;
	py += (ty - py) * 0.2;

	ctx.fillStyle = 'rgba(6, 12, 8, 0.12)';
	ctx.fillRect(0, 0, cw, ch);

	if (t.mouseIsPressed && hasM) {
		ctx.fillStyle = 'rgb(210, 255, 220)';
		ctx.beginPath();
		ctx.arc(px, py, 3, 0, Math.PI * 2);
		ctx.fill();
		if (t.frameCount % 4 === 0) ripples.push({ x: px, y: py, r: 1.5, a: 1 });
	} else if (t.frameCount % 18 === 0) {
		ripples.push({ x: px, y: py, r: 1, a: 0.95 });
	}

	for (let i = ripples.length - 1; i >= 0; i--) {
		const r = ripples[i];
		r.r += 0.65;
		r.a -= 0.022;
		if (r.a <= 0 || r.r > Math.max(cw, ch)) {
			ripples.splice(i, 1);
			continue;
		}
		const col = r.a > 0.55 ? '210, 255, 220' : r.a > 0.25 ? '50, 240, 120' : '20, 130, 65';
		ctx.lineWidth = 1.6;
		ctx.strokeStyle = `rgba(${col}, ${Math.min(1, r.a * 1.5)})`;
		ctx.beginPath();
		ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
		ctx.stroke();
	}

	// Verify GPU WebGLTexture instance accessed via source.texture
	if (source.texture) {
		t.push();
		t.translate(4, 2);
		t.image(source, Math.floor(t.grid.cols * 0.72), Math.floor(t.grid.rows * 0.72));
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const active = source.texture instanceof WebGLTexture;
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(6, 12, 8, 220);
	const panel = `[fg=#32f078]TEXTMODESOURCE.TEXTURE // PHOSPHOR[/fg]
[fg=#148241]INTERACTIVE SANDBOX [A11][/fg]
[fg=#d2ffdc]GPU TEXTURE: ${active ? 'ACTIVE' : 'NULL'} [WebGLTexture][/fg]
[fg=#32f078]CANVAS RES : ${cw}x${ch} STREAM FEED[/fg]
[fg=#d2ffdc]IMPULSE    : (${Math.round(px)}, ${Math.round(py)}) ${t.mouseIsPressed ? '[PAINT]' : '[IDLE]'}[/fg]
[fg=#32f078]RIPPLES    : ${ripples.length} PULSES ACTIVE[/fg]
[fg=#148241]CLICK/DRAG: IMPULSE | IDLE: DRIFT[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
