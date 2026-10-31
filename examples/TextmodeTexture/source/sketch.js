/**
 * @title TextmodeTexture.source
 * @author codex
 * @description Accesses the backing 2D canvas element driving a dynamic textmode texture with split-screen comparison.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const cw = 44,
	ch = 22,
	hw = 22,
	hh = 11;
const canvas = Object.assign(document.createElement('canvas'), { width: cw, height: ch });
const texture = t.createTexture(canvas);
texture.characters(' .:-=+*#%@');
const labelLayer = t.layers.add({ fontSize: 16 });
let splitCol = 22,
	hasM = false;

t.draw(() => {
	t.background(6, 12, 8);
	const ctx = texture.source.getContext('2d');
	const leftCol = -hw,
		topRow = -hh;

	// Render dynamic CRT radar telemetry to backing 2D canvas
	ctx.fillStyle = '#060c08';
	ctx.fillRect(0, 0, cw, ch);
	ctx.strokeStyle = '#148241';
	ctx.beginPath();
	ctx.arc(hw, hh, 6, 0, 7);
	ctx.arc(hw, hh, 10, 0, 7);
	ctx.moveTo(hw, 1);
	ctx.lineTo(hw, ch - 1);
	ctx.moveTo(1, hh);
	ctx.lineTo(cw - 1, hh);
	ctx.stroke();

	const ang = t.frameCount * 0.06;
	ctx.strokeStyle = '#32f078';
	ctx.beginPath();
	ctx.moveTo(hw, hh);
	ctx.lineTo(hw + Math.cos(ang) * 11, hh + Math.sin(ang) * 11);
	ctx.stroke();
	ctx.fillStyle = '#d2ffdc';
	ctx.beginPath();
	ctx.arc(hw + Math.cos(ang - 0.7) * 8, hh + Math.sin(ang - 0.7) * 6, 2, 0, 7);
	ctx.fill();

	// Draw textmode converted texture & curtain divider position
	t.image(texture, cw, ch);
	hasM = Number.isFinite(t.mouse.x);
	splitCol = Math.round(
		hasM ? Math.max(0, Math.min(cw, t.mouse.x - leftCol)) : hw + Math.sin(t.secs * 1.6) * (cw * 0.35)
	);

	// Overlay raw 2D canvas pixels on left of curtain
	const data = ctx.getImageData(0, 0, cw, ch).data;
	t.cellColor(6, 12, 8);
	for (let py = 0; py < ch; py++) {
		for (let px = 0; px < splitCol; px++) {
			const i = (py * cw + px) * 4;
			const r = data[i],
				g = data[i + 1],
				b = data[i + 2];
			t.push();
			t.translate(leftCol + px, topRow + py);
			t.charColor(r, g, b);
			t.char(r + g + b > 30 ? '#' : ' ');
			t.point();
			t.pop();
		}
	}

	t.char('|');
	t.charColor(50, 240, 120);
	t.cellColor(20, 130, 65, 140);
	t.line(leftCol + splitCol, topRow, leftCol + splitCol, topRow + ch);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(6, 12, 8, 220);
	const panel = `[fg=#32f078]TEXTMODETEXTURE.SOURCE // A1[/fg]
[fg=#148241]------------------------------------[/fg]
[fg=#d2ffdc]TARGET: texture.source (Canvas2D)[/fg]
[fg=#32f078]SOURCE: ${texture.source.width}x${texture.source.height} px | RAMP: R1[/fg]
[fg=#d2ffdc]SPLIT : COL ${splitCol}/${cw} (${hasM ? 'MOUSE' : 'AUTO'})[/fg]
[fg=#32f078]LEFT: RAW 2D  |  RIGHT: TEXTMODE[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
