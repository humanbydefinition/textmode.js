/**
 * @title TextmodeLayer.offset
 * @author codex
 * @description Demonstrates multi-layer parallax offset with continuous motion and mouse dampening.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const midLayer = t.layers.add({ blendMode: t.BLEND_ADDITIVE });
const foreLayer = t.layers.add({ blendMode: t.BLEND_ADDITIVE });
const labelLayer = t.layers.add({ fontSize: 16 });
const offset = { x: 0, y: 0 },
	lastMouse = { x: 0, y: 0 };
let activeTimer = 0;

t.mouseClicked(() => {
	offset.x += (Math.random() - 0.5) * 100;
	offset.y += (Math.random() - 0.5) * 60;
});

t.draw(() => {
	t.background(8, 22, 46);
	const time = t.frameCount * 0.035,
		autoX = Math.sin(time) * (t.width * 0.22),
		autoY = Math.cos(time * 0.7) * (t.height * 0.16);
	const hasMouse = Number.isFinite(t.mouse.x) && Number.isFinite(t.mouse.y);
	if (hasMouse && (t.mouse.x !== lastMouse.x || t.mouse.y !== lastMouse.y)) {
		lastMouse.x = t.mouse.x;
		lastMouse.y = t.mouse.y;
		activeTimer = 90;
	} else if (activeTimer > 0) activeTimer--;
	const w = activeTimer / 90;
	const mxIn = hasMouse ? t.mouse.x * t.grid.cellWidth * 0.45 : autoX,
		myIn = hasMouse ? t.mouse.y * t.grid.cellHeight * 0.45 : autoY;
	offset.x += ((1 - w) * autoX + w * mxIn - offset.x) * 0.08;
	offset.y += ((1 - w) * autoY + w * myIn - offset.y) * 0.08;
	midLayer.offset(Math.round(offset.x * 0.45), Math.round(offset.y * 0.45));
	foreLayer.offset(Math.round(offset.x), Math.round(offset.y));
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	const mx = Math.round(midLayer.offset().x / t.grid.cellWidth),
		my = Math.round(midLayer.offset().y / t.grid.cellHeight);
	const fx = Math.round(foreLayer.offset().x / t.grid.cellWidth),
		fy = Math.round(foreLayer.offset().y / t.grid.cellHeight);
	t.push();
	t.charColor(24, 48, 88);
	for (let y = -hh + (hh % 4); y <= hh; y += 4) for (let x = -hw + (hw % 8); x <= hw; x += 8) t.print('.', x, y);
	t.charColor(32, 68, 118);
	t.char('-');
	t.line(-hw, 0, hw, 0);
	t.char('|');
	t.line(0, -hh, 0, hh);
	t.charColor(55, 115, 195);
	t.print('+', 0, 0);
	t.char('+');
	t.line(0, 0, mx, my);
	t.charColor(120, 195, 255);
	t.char('x');
	t.line(mx, my, fx, fy);
	t.pop();
});

midLayer.draw(() => {
	t.clear();
	t.push();
	t.charColor(35, 75, 140);
	t.char('#');
	t.rect(34, 18);
	t.charColor(55, 115, 195);
	t.char('+');
	t.rect(22, 10);
	t.charColor(120, 195, 255);
	t.char('-');
	t.line(-16, 0, 16, 0);
	t.char('|');
	t.line(0, -8, 0, 8);
	for (const [cx, cy] of [
		[-16, -8],
		[13, -8],
		[-16, 7],
		[13, 7],
	]) {
		t.print('+--+', cx, cy);
		t.print('+--+', cx, cy + 1);
	}
	t.print('SCHEMATIC-MID -- SEC:B4', -11, -5);
	t.pop();
});

foreLayer.draw(() => {
	t.clear();
	t.push();
	t.charColor(120, 195, 255);
	t.char('*');
	t.ellipse(14, 8);
	t.charColor(240, 248, 255);
	t.char('+');
	t.point();
	t.print('+===+', -2, -1);
	t.print('| + |', -2, 0);
	t.print('+===+', -2, 1);
	t.print('+-=-+', -8, 0);
	t.print('+-=-+', 4, 0);
	t.print('+', 0, -3);
	t.print('+', 0, 3);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	const f = foreLayer.offset();
	const m = midLayer.offset();
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 14, 24, 220);
	// Inline colors keep the complete telemetry panel in one text block.
	const panel = `[fg=#f0f8ff]TEXTMODELAYER.OFFSET[/fg]
[fg=#3773c3]------------------------------------[/fg]
[fg=#78c3ff]MODE: ${activeTimer > 0 ? 'CURSOR ATTRACTOR' : 'AUTONOMOUS IDLE'}[/fg]
[fg=#f0f8ff]FORE: [${f.x}, ${f.y}] px[/fg]
[fg=#3773c3]MID : [${m.x}, ${m.y}] px[/fg]
[fg=#3773c3]------------------------------------[/fg]
[fg=#78c3ff]MOUSE: STEER PARALLAX DAMPING[/fg]
[fg=#f0f8ff]CLICK: JOLT DISPLACEMENT VECTOR[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
