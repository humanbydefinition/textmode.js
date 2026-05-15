/**
 * @title Textmodifier.lastKeyReleased
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

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

t.draw(() => {
	t.background(6, 10, 22);

	// Retrieve the property
	const lastKey = t.lastKeyReleased;

	t.push();
	t.charColor(255, 140, 180);
	if (lastKey) {
		t.char(lastKey.length === 1 ? lastKey : '?');
		t.rect(10, 10);
	} else {
		t.char('.');
		t.rect(4, 4);
	}
	t.pop();

	drawCenteredText('Textmodifier.lastKeyReleased', -20, [255, 255, 255]);
	drawCenteredText('A property holding the string value of the last key released.', -18, [150, 170, 200]);
	drawCenteredText('Useful for detecting the end of a specific user action.', -16, [150, 170, 200]);

	drawCenteredText(`t.lastKeyReleased = ${lastKey ? '"' + lastKey + '"' : 'null'}`, 10, [255, 140, 180]);
	drawCenteredText('Press and RELEASE any key', 18, [100, 100, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
