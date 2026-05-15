/**
 * @title Textmodifier.clear
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let clearEnabled = true;

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.cellColor(0, 0, 0, 0);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

labelLayer.draw(() => {
	t.clear();

	drawCenteredText('Textmodifier.clear', -12, [240, 245, 255]);
	drawCenteredText('Resetting the current layer buffer to a blank state.', -10, [150, 170, 200]);

	const statusColor = clearEnabled ? [140, 255, 180] : [255, 100, 100];
	drawCenteredText('STATUS: ' + (clearEnabled ? 'CLEAR ACTIVE' : 'CLEAR DISABLED'), 6, statusColor);
	drawCenteredText(
		clearEnabled ? 'The drawing buffer is wiped every frame.' : 'Buffer persists, creating motion trails.',
		9,
		[100, 120, 150]
	);

	drawCenteredText('t.clear()', 13, [100, 120, 150]);
});

t.draw(() => {
	if (t.frameCount % 180 === 0) {
		clearEnabled = !clearEnabled;
		// Ensure a fresh start when re-enabling clear.
		if (clearEnabled) t.clear();
	}

	if (clearEnabled) {
		t.clear();
	}

	const time = t.frameCount * 0.05;
	const x = Math.round(Math.cos(time) * 15);
	const y = Math.round(Math.sin(time * 0.7) * 4);

	t.push();
	t.translate(x, y);
	t.charColor(255, 225, 140);
	t.char('#');
	t.rect(4, 2);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
