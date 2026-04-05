/**
 * @title Textmode.setErrorLevel
 * @author codex
 */
const level = TextmodeErrorLevel.WARNING;

textmode.setErrorLevel(level);

const levels = ['SILENT', 'WARNING', 'ERROR', 'THROW'];
const summaries = ['no output', 'console.warn()', 'console.error()', 'throws'];
const color = [255, 210, 90];

const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

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
	const pulse = 0.65 + 0.35 * Math.sin(t.frameCount * 0.08);
	const glow = Math.round(80 * pulse);
	const activeColor = [color[0], Math.min(255, color[1] + glow), color[2]];
	const meter = levels.map((_, index) => (index <= level ? '|' : '░')).join('');

	t.background(18, 20, 28);

	drawCenteredText('ERROR LEVEL', -4, [180, 190, 210]);
	drawCenteredText(levels[level], -1, activeColor);
	drawCenteredText(meter, 1, activeColor);
	drawCenteredText(summaries[level], 4, [220, 220, 220]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
