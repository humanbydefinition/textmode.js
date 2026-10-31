/**
 * @title TextmodeSource.characters
 * @author codex
 * @description Dynamically modifies the ASCII character ramp used for luminance conversion across cellular wave patterns.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const cw = 48,
	ch = 28;
const canvas = Object.assign(document.createElement('canvas'), { width: cw, height: ch });
const ctx = canvas.getContext('2d'),
	source = t.createTexture(canvas);
const labelLayer = t.layers.add({ fontSize: 16 });

const RAMPS = [
	{ name: 'R2 Standard', chars: ' .:+*#%@' },
	{ name: 'Orbital Soft', chars: ' .oO0@' },
	{ name: 'Linear Hatch', chars: ' -:=+*#' },
	{ name: 'Sparse Dot', chars: ' .:*@' },
];

let rampIdx = 0,
	px = cw / 2,
	py = ch / 2;
source.characters(RAMPS[0].chars);
source.cellColor(10, 16, 12, 255);

function cycleRamp() {
	rampIdx = (rampIdx + 1) % RAMPS.length;
	source.characters(RAMPS[rampIdx].chars);
}
t.mouseClicked(cycleRamp);
t.keyPressed(cycleRamp);

t.draw(() => {
	t.background(10, 16, 12);
	const time = t.frameCount * 0.04;
	const hasM = Number.isFinite(t.mouse.x) && (t.mouse.x !== 0 || t.mouse.y !== 0);
	const targetX = hasM ? ((t.mouse.x + t.grid.cols / 2) / t.grid.cols) * cw : cw / 2 + Math.cos(time) * (cw * 0.35);
	const targetY = hasM
		? ((t.mouse.y + t.grid.rows / 2) / t.grid.rows) * ch
		: ch / 2 + Math.sin(time * 1.3) * (ch * 0.35);
	px += (targetX - px) * 0.15;
	py += (targetY - py) * 0.15;

	const img = ctx.createImageData(cw, ch),
		d = img.data;
	for (let y = 0; y < ch; y++) {
		for (let x = 0; x < cw; x++) {
			const d1 = Math.hypot(x - px, y - py),
				d2 = Math.hypot(x - (cw - px), y - (ch - py));
			const v = Math.sin(d1 * 0.5 - time * 2) * 0.5 + Math.cos(d2 * 0.4 + time) * 0.5;
			const p = (y * cw + x) * 4,
				b = (v + 0.1) / 0.5;
			if (v > 0.4) {
				d[p] = 245;
				d[p + 1] = 255;
				d[p + 2] = 220;
			} else if (v > -0.1) {
				d[p] = Math.round(155 * (1 - b) + 235 * b);
				d[p + 1] = Math.round(225 * (1 - b) + 190 * b);
				d[p + 2] = Math.round(95 * (1 - b) + 75 * b);
			} else {
				d[p] = 10;
				d[p + 1] = 16;
				d[p + 2] = 12;
			}
			d[p + 3] = 255;
		}
	}
	ctx.putImageData(img, 0, 0);

	t.push();
	t.translate(3, 4);
	t.image(source, Math.min(t.grid.cols - 10, 42), Math.min(t.grid.rows - 10, 22));
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(10, 16, 12, 220);
	const panel = `[fg=#9be15f]TEXTMODESOURCE.CHARACTERS // A5[/fg]
[fg=#ebbe4b]CELLULAR RIPPLE MATRIX [A5][/fg]
[fg=#f5ffdc]RAMP [${rampIdx + 1}/4]: "${RAMPS[rampIdx].chars}"[/fg]
[fg=#9be15f]STYLE: ${RAMPS[rampIdx].name}[/fg]
[fg=#ebbe4b]SOURCE: characters(chars) ramp[/fg]
[fg=#f5ffdc]CLICK / KEY: SWITCH RAMP PRESET[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
