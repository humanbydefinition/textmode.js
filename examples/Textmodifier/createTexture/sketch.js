/**
 * @title Textmodifier.createTexture
 * @author codex
 * @description Generates a dynamic WebGL texture from a 2D canvas simulating organic cellular wave patterns.
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const cw = 48,
	ch = 28;
const canvas = Object.assign(document.createElement('canvas'), { width: cw, height: ch });
const ctx = canvas.getContext('2d');
const texture = t.createTexture(canvas);
texture.characters(' .:-=+*#%@');
const labelLayer = t.layers.add({ fontSize: 16 });

let px = cw / 2,
	py = ch / 2,
	hasM = false;

t.mouseClicked(() => {
	px = Math.round(((t.mouse.x + t.grid.cols / 2) / t.grid.cols) * cw);
	py = Math.round(((t.mouse.y + t.grid.rows / 2) / t.grid.rows) * ch);
});

t.draw(() => {
	t.background(10, 16, 12);
	const time = t.frameCount * 0.05;
	hasM = Number.isFinite(t.mouse.x) && (t.mouse.x !== 0 || t.mouse.y !== 0);

	const targetX = hasM ? ((t.mouse.x + t.grid.cols / 2) / t.grid.cols) * cw : cw / 2 + Math.cos(time) * (cw * 0.35);
	const targetY = hasM
		? ((t.mouse.y + t.grid.rows / 2) / t.grid.rows) * ch
		: ch / 2 + Math.sin(time * 1.3) * (ch * 0.35);
	px += (targetX - px) * 0.15;
	py += (targetY - py) * 0.15;

	// Render cellular reaction-diffusion ripples into 2D source canvas
	const img = ctx.createImageData(cw, ch);
	const d = img.data;
	for (let y = 0; y < ch; y++) {
		for (let x = 0; x < cw; x++) {
			const d1 = Math.hypot(x - px, y - py);
			const d2 = Math.hypot(x - (cw - px), y - (ch - py));
			const v = Math.sin(d1 * 0.6 - time * 2) * 0.5 + Math.cos(d2 * 0.5 + time) * 0.5;
			const p = (y * cw + x) * 4;
			if (v > 0.1) {
				const blend = Math.min(1, Math.max(0, (v - 0.1) * 1.25));
				d[p] = Math.round(155 * (1 - blend) + 235 * blend);
				d[p + 1] = Math.round(225 * (1 - blend) + 190 * blend);
				d[p + 2] = Math.round(95 * (1 - blend) + 75 * blend);
				d[p + 3] = 255;
			} else {
				d[p] = 10;
				d[p + 1] = 16;
				d[p + 2] = 12;
				d[p + 3] = 255;
			}
		}
	}
	ctx.putImageData(img, 0, 0);

	// Display texture scaled and offset below HUD
	t.push();
	t.translate(0, 3);
	t.image(texture, Math.min(t.grid.cols - 2, cw), Math.min(t.grid.rows - 6, ch));
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2,
		top = -Math.floor(t.grid.rows / 2) + 2;
	let y = top;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 16, 12, 255);
	t.charColor(155, 225, 95);
	t.print('TEXTMODIFIER.CREATETEXTURE // A5', left, y++);
	t.charColor(235, 190, 75);
	t.print('------------------------------------', left, y++);
	t.charColor(245, 255, 220);
	t.print(`SOURCE: ${cw}x${ch} Canvas2D cellular wave`, left, y++);
	t.charColor(155, 225, 95);
	t.print(`PROBE : [${Math.round(px)}, ${Math.round(py)}] (${hasM ? 'MOUSE' : 'AUTO'})`, left, y++);
	t.charColor(235, 190, 75);
	t.print('RAMP  : R1 Density | PALETTE: P8 Moss', left, y++);
	t.charColor(245, 255, 220);
	t.print('DRAG/MOVE: EMIT | IDLE: DRIFT', left, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
