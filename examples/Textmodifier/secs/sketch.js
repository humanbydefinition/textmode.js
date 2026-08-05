/**
 * @title Textmodifier.secs
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(8, 12, 24);
	const sec = t.secs;
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	const sunX = Math.cos(sec * 0.2) * (hw * 0.7);
	const sunY = Math.sin(sec * 0.2) * (hh * 0.6);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const sunDist = Math.hypot(x - sunX, y - sunY);

			t.push();
			t.translate(x, y);

			if (sunDist < 2.5) {
				t.charColor(255, 220, 100);
				t.cellColor(45, 30, 10);
				t.char('O');
			} else if (y > 4) {
				t.charColor(40, 80, 60);
				t.cellColor(10, 20, 16);
				t.char('#');
			} else {
				const star = (Math.sin(x * 7 + y * 13) + 1) * 0.5 > 0.95;
				t.charColor(star ? 200 : 30, star ? 220 : 45, star ? 255 : 75);
				t.cellColor(8, 12, 24);
				t.char(star ? '*' : '.');
			}

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
	t.print('TEXTMODIFIER.SECS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ASTRONOMICAL SOLAR TRANSIT', x, y++);
	t.charColor(140, 160, 190);
	t.print('secs returns total elapsed seconds.', x, y++);
	t.print('Solar arc advances smoothly over time.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 220, 100);
	t.print(`ELAPSED: ${t.secs.toFixed(2)} SECS`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
