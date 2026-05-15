/**
 * @title Textmodifier.box
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let w = 0,
	h = 0,
	d = 0;

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

labelLayer.draw(() => {
	t.clear();

	drawCenteredText('Textmodifier.box', -12, [240, 245, 255]);
	drawCenteredText('A 3D box primitive with width, height, and depth.', -10, [150, 170, 200]);

	drawCenteredText(`WIDTH:  ${w.toFixed(1)}`, 8, [140, 180, 255]);
	drawCenteredText(`HEIGHT: ${h.toFixed(1)}`, 10, [140, 255, 180]);
	drawCenteredText(`DEPTH:  ${d.toFixed(1)}`, 12, [255, 225, 140]);

	drawCenteredText('t.box(width, height, depth)', 15, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;

	w = 12 + Math.sin(time) * 4;
	h = 8 + Math.cos(time * 0.7) * 3;
	d = 10 + Math.sin(time * 0.5) * 4;

	t.ambientLight(30, 40, 60);
	t.pointLight([255, 225, 140], 0, -20, 30);
	t.camera(15, -10, 40, 0, 0, 0);

	t.push();
	t.rotateX(time * 20);
	t.rotateY(time * 30);
	t.char('#');
	t.charColor(140, 180, 255);
	t.cellColor(20, 30, 60);

	t.box(w, h, d);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
