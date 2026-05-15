/**
 * @title TextmodeLayer.draw
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const backLayer = t.layers.add({ opacity: 0.6 });
const effectLayer = t.layers.add({ blendMode: 'additive' });

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
	t.background(6, 10, 22);
	drawCenteredText('TextmodeLayer.draw', -12, [240, 245, 255]);

	t.push();
	t.charColor(40, 50, 80);
	t.char('.');
	for (let y = -4; y <= 4; y += 2) {
		t.push();
		t.translate(0, y);
		t.rect(t.grid.cols, 1);
		t.pop();
	}
	t.pop();
});

backLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.03;

	// Floating data nodes circling the center
	for (let i = 0; i < 6; i++) {
		const angle = time + (i / 6) * Math.PI * 2;
		const r = 10;
		t.push();
		t.translate(Math.round(Math.cos(angle) * r * 1.5), Math.round(Math.sin(angle) * r * 0.6));
		t.charColor(100, 150, 255);
		t.char('o');
		t.point();
		t.pop();
	}
});

effectLayer.draw(() => {
	t.clear();
	const time = t.frameCount * 0.05;
	const pulse = 0.5 + 0.5 * Math.sin(time);

	// Central core pulsing shape
	t.push();
	t.charColor(255, 100 + pulse * 155, 100);
	t.char('#');
	t.rect(8, 4);
	t.pop();

	drawCenteredText('INDEPENDENT LAYER CONTEXTS', 10, [150, 170, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
