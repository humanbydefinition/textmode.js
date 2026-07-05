/**
 * @title Textmodifier.randomGaussian
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	seed: 'gaussian-cloud',
});

const labelLayer = t.layers.add();
const samples = [];
let latest = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function addSample() {
	latest = t.randomGaussian(0, 6);
	samples.push(latest);
	if (samples.length > 180) {
		samples.shift();
	}
}

t.draw(() => {
	t.background(4, 7, 16);
	for (let i = 0; i < 4; i++) {
		addSample();
	}

	t.char('.');
	t.charColor(45, 60, 95);
	for (let x = -24; x <= 24; x += 2) {
		t.line(x, 9, x, 10);
	}

	for (let i = 0; i < samples.length; i++) {
		const age = i / samples.length;
		const x = t.constrain(t.round(samples[i]), -24, 24);
		const y = 8 - t.floor(age * 16);
		t.push();
		t.translate(x, y);
		t.char(age > 0.7 ? '*' : age > 0.35 ? '+' : '.');
		t.charColor(90 + age * 140, 150 + age * 90, 255);
		t.point();
		t.pop();
	}

	t.char('|');
	t.charColor(255, 205, 90);
	t.line(0, -10, 0, 10);
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.RANDOMGAUSSIAN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SEEDED BELL CURVE', x, y++, 100, 220, 255);
	drawText('Most samples gather near mean 0.', x, y++, 140, 160, 190);
	drawText('Standard deviation sets spread.', x, y++, 140, 160, 190);
	drawText('The sequence is reproducible.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`LATEST: ${latest.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`SAMPLES: ${samples.length}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
