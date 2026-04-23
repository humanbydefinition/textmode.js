/**
 * @title Textmodifier.loop
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

let paused = false;
let resumed = 0;

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

t.mouseClicked(() => {
	if (paused) {
		paused = false;
		resumed++;
		t.loop();
	}
});

t.draw(() => {
	t.background(0);

	if (!paused && resumed === 0 && t.frameCount >= 90) {
		paused = true;
		t.noLoop();
		t.redraw();
	}

	t.push();
	t.rotateZ(t.frameCount * 4);
	t.char(resumed > 0 ? '*' : 'A');
	t.charColor(paused ? 255 : 100, paused ? 170 : 255, 160);
	t.rect(14, 14);
	t.pop();

	drawLabel(paused ? 'click to call loop()' : 'auto-pause at frame 90', -12);
	drawLabel(`loop() calls: ${resumed}`, -9, paused ? 255 : 140);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
