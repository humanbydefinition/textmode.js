/**
 * @title Textmode.setErrorLevel
 * @author OpenCode
 */
const levels = [
	{ name: 'SILENT', value: TextmodeErrorLevel.SILENT, summary: 'no output' },
	{ name: 'WARNING', value: TextmodeErrorLevel.WARNING, summary: 'console.warn()' },
	{ name: 'ERROR', value: TextmodeErrorLevel.ERROR, summary: 'console.error()' },
	{ name: 'THROW', value: TextmodeErrorLevel.THROW, summary: 'throws' },
];

let activeIndex = 1;
textmode.setErrorLevel(levels[activeIndex].value);

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.draw(() => {
	const cycle = 180;
	const idx = Math.floor(t.frameCount / cycle) % levels.length;

	if (idx !== activeIndex) {
		activeIndex = idx;
		textmode.setErrorLevel(levels[activeIndex].value);
	}

	const level = levels[activeIndex];
	const pulse = 0.65 + 0.35 * Math.sin(t.frameCount * 0.08);
	const glow = Math.round(80 * pulse);
	const activeColor = [255, Math.min(255, 210 + glow), 90];
	const meter = levels.map((_, i) => (i <= activeIndex ? '|' : '░')).join('');

	t.background(18, 20, 28);

	drawCenteredText('ERROR LEVEL', -4, [180, 190, 210]);
	drawCenteredText(level.name, -1, activeColor);
	drawCenteredText(meter, 1, activeColor);
	drawCenteredText(level.summary, 4, [220, 220, 220]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
