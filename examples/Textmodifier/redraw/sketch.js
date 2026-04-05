/**
 * @title Textmodifier.redraw
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600, fontSize: 16 });

let manualMode = false;
let bursts = 0;
let rings = 1;

function drawLabel(text, y, color = 180) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(color);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

function triggerRedraw(count) {
	if (!manualMode) {
		return;
	}

	bursts++;
	rings = (rings % 5) + 1;
	t.redraw(count);
}

t.keyPressed((data) => {
	if (data.key === ' ') {
		triggerRedraw(1);
	}

	if (data.key === 'Enter') {
		triggerRedraw(3);
	}
});

t.mousePressed(() => {
	triggerRedraw(1);
});

t.draw(() => {
	if (!manualMode && t.frameCount >= 90) {
		manualMode = true;
		t.noLoop();
	}

	t.background(0);

	for (let i = 0; i < rings; i++) {
		t.push();
		t.rotateZ(t.frameCount * 4 + i * 22);
		t.char(i % 2 === 0 ? 'O' : '+');
		t.charColor(80 + i * 35, 160 + i * 15, 255);
		t.rect(6 + i * 4, 6 + i * 4);
		t.pop();
	}

	drawLabel(manualMode ? 'manual redraw mode' : 'auto pause at frame 90', -12, 220);
	drawLabel('space/click = redraw(1)', -9);
	drawLabel('enter = redraw(3)', -6);
	drawLabel(`bursts: ${bursts}`, 12, manualMode ? 255 : 120);
});
