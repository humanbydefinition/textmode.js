/**
 * @title TextmodeLayer.texture
 * @author codex
 * @description Exposes the composited WebGLTexture handle of the layer for custom shader sampling.
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const ramp = ' .+*#@';
const prism = t.layers.add({ fontSize: 16, blendMode: t.BLEND_ADDITIVE });
const labelLayer = t.layers.add({ fontSize: 16 });

t.draw(() => {
	t.background(12, 6, 22);
});

prism.draw(() => {
	t.clear();
	const time = t.secs;
	const hasM = Number.isFinite(t.mouse.x);
	const cx = hasM ? t.mouse.x * 0.25 : Math.sin(time * 0.8) * 12;
	const cy = hasM ? t.mouse.y * 0.25 : Math.cos(time * 0.6) * 7;
	const boost = t.mouseIsPressed ? 1.35 : 1.0;

	for (let ring = 1; ring <= 7; ring++) {
		const rad = ring * 3.4 * boost;
		const rot = time * (ring % 2 === 0 ? 0.35 : -0.35) + ring * 0.25;
		const count = ring * 8;
		for (let i = 0; i < count; i++) {
			const a = rot + (i / count) * Math.PI * 2;
			const r = rad / (Math.abs(Math.cos(a * 2)) + Math.abs(Math.sin(a * 2)) * 0.7 + 0.5);
			const wave = (Math.sin(r * 0.38 - time * 3 + a * 2) + 1) * 0.5;
			const idx = Math.min(ramp.length - 1, Math.floor(wave * ramp.length));
			if (idx === 0) continue;
			const cRatio = (Math.sin(a * 2 + time * 1.6) + 1) * 0.5;
			t.push();
			t.translate(Math.round(cx + Math.cos(a) * r * 1.4), Math.round(cy + Math.sin(a) * r * 0.85));
			t.char(ramp[idx]);
			t.charColor(Math.floor(75 + cRatio * 170), Math.floor(200 - cRatio * 125), 255);
			t.cellColor(20, 10, 32, 80);
			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 2;
	const hud = (text, r = 220, g = 230, b = 255) => {
		t.push();
		t.printAlign('left', 'top');
		t.translate(left + 2, y++, 0);
		t.charColor(r, g, b);
		t.cellColor(10, 14, 24, 220);
		t.print(text, 0, 0);
		t.pop();
	};

	const tex = prism.texture;
	const match = Boolean(tex && tex === prism.asciiFramebuffer?.textures[0]);
	const hasM = Number.isFinite(t.mouse.x);
	const [u, v] = hasM
		? [((t.mouse.x - left) / t.grid.cols).toFixed(2), ((t.mouse.y - top) / t.grid.rows).toFixed(2)]
		: ['--', '--'];

	hud('TEXTMODELAYER.TEXTURE // A10', 255, 225, 250);
	hud('------------------------------------', 75, 200, 255);
	hud('ACCESS: prismLayer.texture', 245, 75, 200);
	hud(`HANDLE: ${tex ? 'WebGLTexture [BOUND]' : 'INITIALIZING'}`, tex ? 75 : 245, tex ? 200 : 75, 255);
	hud(`SOURCE: ${match ? 'asciiFramebuffer (tex 0)' : 'UNBOUND'}`, 180, 200, 240);
	hud(`BUFFER: ${prism.width}x${prism.height} px`, 180, 200, 240);
	hud('------------------------------------', 75, 200, 255);
	hud(`PROBE: [${u}, ${v}] (${hasM ? `${t.mouse.x},${t.mouse.y}` : 'HOVER'})`, 255, 225, 250);
	hud(t.mouseIsPressed ? 'PRISM PULSE ACTIVE' : 'LIVE HIT-TEST PROBE', 245, 75, 200);

	if (hasM) {
		t.push();
		t.translate(t.mouse.x, t.mouse.y);
		t.charColor(255, 225, 250);
		t.cellColor(245, 75, 200, 200);
		t.char('+');
		t.point();
		t.pop();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
