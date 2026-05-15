/**
 * @title Textmodifier.keyTyped
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let inputText = '';
let lastChar = '';
let charPulse = 0;

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

t.keyTyped((data) => {
	lastChar = data.key;
	charPulse = 1.0;

	// Append to our string
	inputText += data.key;
	if (inputText.length > 20) inputText = inputText.slice(-20);
});

t.keyPressed((data) => {
	if (data.key === 'Backspace') {
		inputText = inputText.slice(0, -1);
	}
});

t.draw(() => {
	t.background(6, 10, 22);

	const cursor = t.frameCount % 60 < 30 ? '_' : ' ';
	const display = `> ${inputText}${cursor}`;

	t.push();
	t.charColor(100, 255, 150);
	t.translate(-Math.floor(display.length / 2), 2);
	t.push();
	t.cellColor(20, 40, 30);
	t.translate(Math.floor(display.length / 2), 0);
	t.rect(display.length + 4, 3);
	t.pop();

	for (let i = 0; i < display.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(display[i]);
		t.point();
		t.pop();
	}
	t.pop();

	if (charPulse > 0) {
		t.push();
		t.translate(0, -8);
		t.char(lastChar);
		t.charColor(100, 200, 255, charPulse * 255);
		t.rect(10 + charPulse * 10, 10 + charPulse * 10);
		t.pop();
		charPulse *= 0.92;
	}

	drawCenteredText('Textmodifier.keyTyped', -20, [255, 255, 255]);
	drawCenteredText('Triggers when a printable character is typed.', -18, [150, 170, 200]);
	drawCenteredText('Best for text input, as it handles case and symbols.', -17, [150, 170, 200]);

	drawCenteredText('Type on your keyboard to enter text', 14, [100, 100, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
