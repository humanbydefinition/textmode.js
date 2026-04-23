/**
 * @title Textmodifier.resetMatrix
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
	t.background(5, 7, 18);

	t.push();
	t.translate(-8, 0);
	t.rotateZ(t.frameCount * 1.6);
	t.charColor(255, 140, 120);
	t.rect(10, 10);
	t.pop();

	t.push();
	t.translate(8, 0);
	t.rotateZ(t.frameCount * 1.6);
	t.resetMatrix();
	t.translate(8, 0);
	t.charColor(120, 205, 255);
	t.rect(10, 10);
	t.pop();

	drawLabel('left keeps rotation', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	drawLabel('right calls resetMatrix()', Math.floor(t.grid.rows * 0.30), [120, 205, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
