/**
 * @title TextmodeSource.dispose
 * @author codex
 * @description Frees backing WebGL GPU texture memory with interactive release and seamless lifecycle fallback.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 });
const RAMP = ' .+*^v<>#';
let source = null,
	disposed = false,
	glitch = 0;

const imgUrl = (() => {
	const c = document.createElement('canvas');
	c.width = 64;
	c.height = 48;
	const g = c.getContext('2d'),
		r = g.createRadialGradient(32, 24, 2, 32, 24, 30);
	r.addColorStop(0, '#fff5d7');
	r.addColorStop(0.4, '#ffc337');
	r.addColorStop(0.7, '#ff5546');
	r.addColorStop(1, '#10060a');
	g.fillStyle = r;
	g.fillRect(0, 0, 64, 48);
	return c.toDataURL();
})();

async function loadSource() {
	const s = await t.loadImage(imgUrl);
	return s.characters(RAMP).charColorMode('sampled').cellColorMode('fixed').cellColor(16, 6, 10);
}

t.mouseClicked(async () => {
	disposed = !disposed;
	if (disposed && source) source.dispose();
	else source = await loadSource();
	glitch = 8;
});

t.setup(async () => (source = await loadSource()));

t.draw(() => {
	t.background(16, 6, 10);
	const phase = t.frameCount * 0.04 + (Number.isFinite(t.mouse.x) ? t.mouse.x * 0.04 : 0);
	const cols = Math.floor(t.grid.cols * 0.55),
		rows = Math.floor(t.grid.rows * 0.55);
	const x0 = -Math.floor(cols / 2),
		y0 = -Math.floor(rows / 2);
	if (source && !disposed) {
		t.push();
		t.rotateZ(Math.sin(phase * 0.8) * 0.06);
		t.image(source, cols, rows);
		t.pop();
	} else {
		for (let ry = 0; ry < rows; ry++) {
			let line = '',
				ny = (ry / rows - 0.5) * 2;
			for (let rx = 0; rx < cols; rx++) {
				const nx = (rx / cols - 0.5) * 2,
					d = Math.hypot(nx, ny * 1.3);
				const wave = Math.sin(d * 8 - phase * 3 + Math.sin(nx * 4 + phase));
				const j = Math.sin(ry * 14.3 + phase * 8) > 0.85 ? 0.35 : 0;
				line += RAMP[Math.floor(Math.max(0, Math.min(1, (wave + j + 1) * 0.5)) * 7)];
			}
			t.cellColor(16, 6, 10);
			t.charColor(255, ry % 4 === 0 ? 245 : ry % 2 ? 195 : 85, ry % 4 === 0 ? 215 : ry % 2 ? 55 : 70);
			t.print(line, x0, y0 + ry);
		}
	}
	if (glitch > 0 && glitch--) {
		t.charColor(255, 245, 215);
		t.cellColor(255, 85, 70, 200);
		t.print('^'.repeat(cols), x0, y0 + Math.floor(Math.random() * rows));
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(16, 6, 10, 220);
	const panel = `[fg=#ffc337]TEXTMODESOURCE.DISPOSE[/fg]
[fg=#ff5546]------------------------------[/fg]
[fg=#fff5d7]RESOURCE : ${disposed ? 'DISPOSED (0 KB)' : 'ACTIVE (16 KB)'}[/fg]
[fg=#fff5d7]PIPELINE : ${disposed ? 'FALLBACK GLITCH' : 'HARDWARE TEXTURE'}[/fg]
[fg=#ffc337]CLICK TO TOGGLE DISPOSE/ALLOC[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
