/**
 * @title Textmodifier.stroke
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

function drawLabel(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);

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
	const pulse = (Math.sin(t.frameCount * 0.04) + 1) * 0.5;
	t.background(5, 7, 18);

	t.stroke(255, 140 + pulse * 80, 90);
	t.fill(20, 50 + pulse * 90, 140 + pulse * 80);

	t.push();
	t.rotateZ(t.frameCount * 1.1);
	t.rect(t.grid.cols - 12, t.grid.rows - 12);
	t.pop();

	const stroke = t.stroke();
	const fill = t.fill();

	drawLabel(`stroke ${stroke.r},${stroke.g},${stroke.b}`, -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	drawLabel(`fill ${fill.r},${fill.g},${fill.b}`, Math.floor(t.grid.rows * 0.30), [120, 205, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
