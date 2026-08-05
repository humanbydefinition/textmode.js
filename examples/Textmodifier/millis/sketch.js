/**
 * @title Textmodifier.millis
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(10, 16, 32);
	const ms = t.millis;
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const waveRamp = '~=*#@';

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist1 = Math.hypot(x - Math.sin(ms * 0.001) * 10, y);
			const dist2 = Math.hypot(x + Math.sin(ms * 0.001) * 10, y);
			const wave = (Math.sin(dist1 * 0.3 - ms * 0.005) + Math.cos(dist2 * 0.3 - ms * 0.005)) * 0.5 + 0.5;

			const idx = Math.min(waveRamp.length - 1, Math.floor(wave * waveRamp.length));

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(40 + wave * 215), Math.floor(200 - wave * 70), Math.floor(220 + wave * 35));
			t.cellColor(10, 18, 38);
			t.char(waveRamp[idx]);
			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.MILLIS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: HIGH-PRECISION MILLISECOND SYNTH', x, y++);
	t.charColor(140, 160, 190);
	t.print('millis returns high-res elapsed ms.', x, y++);
	t.print('Standing wave phase computed live.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`ELAPSED: ${t.millis.toFixed(1)} MS`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
