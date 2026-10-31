/**
 * @title TextmodeFramebuffer.resize
 * @author codex
 * @description Dynamically resizes offscreen framebuffer attachments while preserving rendering pipeline state.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 });
let curW = 20,
	curH = 14;
const fb = t.createFramebuffer({ width: curW, height: curH });

const drawBox = (cx, cy, w, h, label, r, g, b) => {
	const x1 = cx - Math.floor(w / 2) - 1,
		x2 = x1 + w + 1,
		y1 = cy - Math.floor(h / 2) - 1,
		y2 = y1 + h + 1;
	t.charColor(r, g, b);
	t.cellColor(8, 10, 24, 220);
	for (let x = x1; x <= x2; x++)
		for (const [y, ch] of [
			[y1, x === x1 || x === x2 ? '+' : '-'],
			[y2, x === x1 || x === x2 ? '+' : '-'],
		]) {
			t.push();
			t.translate(x, y);
			t.char(ch);
			t.point();
			t.pop();
		}
	for (let y = y1 + 1; y < y2; y++)
		for (const x of [x1, x2]) {
			t.push();
			t.translate(x, y);
			t.char('|');
			t.point();
			t.pop();
		}
	t.push();
	t.printAlign('center', 'middle');
	t.translate(cx, y1);
	t.charColor(235, 250, 255);
	t.cellColor(8, 10, 24, 240);
	t.print(` ${label} `, 0, 0);
	t.pop();
};

const drawCore = (w, h, time) => {
	for (let i = 4; i >= 1; i--) {
		t.push();
		t.rotateZ((time * (i % 2 === 0 ? 35 : -35) * (5 - i)) % 360);
		t.char(' .:-+#'[i]);
		t.charColor(i === 4 ? 235 : i % 2 === 0 ? 70 : 140, i === 4 ? 250 : i % 2 === 0 ? 220 : 90, 255);
		t.cellColor(10, 14, 28, 80 + i * 35);
		const rx = Math.max(2, Math.round(w * i * 0.21)),
			ry = Math.max(2, Math.round(h * i * 0.21));
		i === 3 || i === 2 ? t.ellipse(rx, ry) : t.rect(rx, ry);
		t.pop();
	}
	t.push();
	t.rotateZ((time * 20) % 360);
	t.char('.');
	t.charColor(235, 250, 255);
	t.line(-w * 0.42, 0, w * 0.42, 0);
	t.line(0, -h * 0.42, 0, h * 0.42);
	t.pop();
};

t.draw(() => {
	t.background(8, 10, 24);
	const time = t.frameCount * 0.035,
		halfW = Math.floor(t.grid.cols / 2),
		halfH = Math.floor(t.grid.rows / 2);
	const scrub = Number.isFinite(t.mouse.x)
		? Math.max(0, Math.min(1, (t.mouse.x + halfW) / (halfW * 2)))
		: Math.sin(time * 1.4) * 0.5 + 0.5;
	const minW = 10,
		maxW = Math.min(34, Math.max(16, Math.floor(halfW * 0.82))),
		minH = 6,
		maxH = Math.min(22, Math.max(10, Math.floor(halfH * 0.72)));
	const targetW = Math.round(minW + scrub * (maxW - minW)),
		targetH = Math.round(minH + scrub * (maxH - minH));
	if (targetW !== curW || targetH !== curH) {
		fb.resize(targetW, targetH);
		curW = targetW;
		curH = targetH;
	}

	fb.begin();
	t.clear();
	t.background(8, 10, 24);
	drawCore(curW, curH, time);
	fb.end();

	t.charColor(140, 90, 255);
	t.cellColor(8, 10, 24, 200);
	for (let y = -halfH + 1; y <= halfH - 2; y++) {
		t.push();
		t.translate(0, y);
		t.char(y === -halfH + 1 || y === halfH - 2 ? '+' : '|');
		t.point();
		t.pop();
	}

	const leftCX = -Math.floor(halfW * 0.52),
		rightCX = Math.floor(halfW * 0.52),
		cy = 2;
	const baseW = Math.min(22, Math.max(12, Math.floor(halfW * 0.68))),
		baseH = Math.min(15, Math.max(8, Math.floor(halfH * 0.58)));
	t.push();
	t.translate(leftCX, cy);
	t.char(' ');
	t.cellColor(8, 10, 24);
	t.rect(baseW, baseH);
	drawCore(baseW, baseH, time);
	t.pop();
	drawBox(leftCX, cy, baseW, baseH, '[A] BASELINE', 70, 220, 255);
	t.push();
	t.translate(rightCX, cy);
	t.image(fb);
	t.pop();
	drawBox(rightCX, cy, curW, curH, `[B] FB ${curW}x${curH}`, 140, 90, 255);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 14, 24, 220);
	// Inline colors keep the complete telemetry panel in one text block.
	const panel = `[fg=#46dcff]TEXTMODEFRAMEBUFFER.RESIZE[/fg]
[fg=#8c5aff]------------------------------------[/fg]
[fg=#ebfaff]A: FIXED PIPELINE | B: RESIZED FB[/fg]
[fg=#46dcff]ATTACHMENTS: ${curW}x${curH} TEXTURE CELLS[/fg]
[fg=#8c5aff]SCRUB: MOUSE X . IDLE: AUTO-SINE[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
