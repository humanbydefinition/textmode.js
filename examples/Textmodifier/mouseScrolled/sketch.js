/**
 * @title Textmodifier.mouseScrolled
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const RAMP = '·:;oO8@█';
const labelLayer = t.layers.add();
let scrollDepth = 0,
	lastDelta = 0,
	scrollCount = 0;

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

t.mouseScrolled((data) => {
	lastDelta = data.delta.y;
	scrollDepth += data.delta.y * 0.04;
	scrollCount++;
});

t.draw(() => {
	t.background(4, 4, 8);
	scrollDepth += 0.012; // Baseline ambient tunnel movement

	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);

	for (let y = -hh; y <= hh; y += 1) {
		for (let x = -hw; x <= hw; x += 1) {
			const dist = Math.hypot(x, y * 1.3);
			let ringPhase = (dist * 0.2 - scrollDepth) % 1.0;
			if (ringPhase < 0) ringPhase += 1.0;

			if (ringPhase < 0.4) {
				const intensity = 1 - ringPhase / 0.4;
				const charIdx = Math.min(RAMP.length - 1, Math.floor(intensity * RAMP.length));
				t.push();
				t.translate(x, y);

				if (dist < 6) {
					// Golden Electric center core
					t.charColor(255, Math.floor(200 + intensity * 55), 0);
					t.cellColor(90, 40, 0);
				} else if (dist < 18) {
					// Neon Magenta middle tunnel
					t.charColor(255, 0, Math.floor(127 + intensity * 128));
					t.cellColor(60, 0, 30);
				} else {
					// Deep Violet outer rings
					t.charColor(
						Math.floor(58 + intensity * 80),
						Math.floor(28 + intensity * 50),
						Math.floor(94 + intensity * 100)
					);
				}

				t.char(RAMP[charIdx]);
				t.point();
				t.pop();
			}
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.MOUSESCROLLED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SCROLL DELTA & DEPTH ZOOM', x, y++, 100, 220, 255);
	drawText('Fires on mouse wheel or touchpad scroll.', x, y++, 140, 160, 190);
	drawText('Scrolling steps depth through tunnel.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('SCROLL EVENTS: ' + scrollCount, x, y++, 140, 255, 180);
	drawText('DEPTH POSITION: ' + scrollDepth.toFixed(2), x, y++, 180, 200, 220);
	drawText('LAST SCROLL DELTA: ' + lastDelta.toFixed(1), x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
