/**
 * @title Textmodifier.noLoop
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

function toggleLoop() {
	if (t.isLooping) {
		t.noLoop();
	} else {
		t.loop();
	}
}

t.mousePressed(toggleLoop);
t.keyPressed((e) => {
	if (e.key === ' ') toggleLoop();
});

t.draw(() => {
	t.background(6, 10, 22);

	const looping = t.isLooping;
	const time = t.secs;

	t.push();
	t.rotateZ(time * 60);
	t.charColor(looping ? [100, 255, 150] : [255, 100, 100]);
	t.char(looping ? '☼' : '×');
	t.rect(15, 15);
	t.pop();

	t.push();
	t.translate(0, 10);
	const statusText = looping ? 'STATUS: RUNNING' : 'STATUS: STOPPED';
	drawCenteredText(statusText, 0, looping ? [100, 255, 150] : [255, 100, 100]);
	drawCenteredText(`Frame Count: ${t.frameCount}`, 2, [140, 180, 255]);
	t.pop();

	drawCenteredText('Textmodifier.noLoop', -20, [255, 255, 255]);
	drawCenteredText('Stops the continuous execution of the draw loop.', -18, [150, 170, 200]);
	drawCenteredText('Use loop() to restart or redraw() for a single frame.', -16, [150, 170, 200]);

	drawCenteredText('Click or Press SPACE to toggle loop', 18, [100, 100, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
