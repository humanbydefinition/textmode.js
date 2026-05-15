/**
 * @title Textmodifier.keyPressed
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const keyHistory = [];
let pulse = 0;

function drawCenteredText(text, row, rgb = [240, 245, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), row);
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

t.keyPressed((data) => {
	keyHistory.unshift({
		key: data.key,
		code: data.code,
		time: t.secs,
	});

	if (keyHistory.length > 5) keyHistory.pop();

	pulse = 1.0;
});

t.draw(() => {
	t.background(6, 10, 22);

	const lastKey = keyHistory[0] ? keyHistory[0].key : 'NONE';
	t.push();
	t.charColor(100, 200, 255, pulse * 255);
	t.char(lastKey.length === 1 ? lastKey : '?');
	t.rect(12 + pulse * 4, 12 + pulse * 4);
	t.pop();

	pulse *= 0.9; // Fade out the pulse

	drawCenteredText('--- KEY EVENT LOG ---', 8, [100, 255, 150]);
	keyHistory.forEach((entry, i) => {
		const alpha = 1.0 - i * 0.2;
		const logText = `Key: "${entry.key}" | Code: ${entry.code}`;
		drawCenteredText(logText, 10 + i * 2, [200, 210, 230, alpha * 255]);
	});

	drawCenteredText('Textmodifier.keyPressed', -20, [255, 255, 255]);
	drawCenteredText('Triggers once per key press event.', -18, [150, 170, 200]);
	drawCenteredText('Unlike isKeyPressed, this does not repeat when held.', -16, [150, 170, 200]);

	drawCenteredText('Press any key to trigger event', 20, [100, 100, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
