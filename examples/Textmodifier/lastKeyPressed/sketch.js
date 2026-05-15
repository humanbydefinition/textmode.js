/**
 * @title Textmodifier.lastKeyPressed
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
	const lastKey = t.lastKeyPressed;

	t.push();
	t.charColor(100, 255, 200);
	if (lastKey) {
		t.char(lastKey.length === 1 ? lastKey : '?');
		t.rect(10, 10);
	} else {
		t.char('.');
		t.rect(4, 4);
	}
	t.pop();

	drawCenteredText('Textmodifier.lastKeyPressed', -20, [255, 255, 255]);
	drawCenteredText('A property holding the string value of the last key pressed.', -18, [150, 170, 200]);
	drawCenteredText('This value persists until a new key is pressed.', -16, [150, 170, 200]);

	drawCenteredText(`t.lastKeyPressed = ${lastKey ? '"' + lastKey + '"' : 'null'}`, 10, [100, 255, 200]);
	drawCenteredText('Press any key to update property', 18, [100, 100, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
