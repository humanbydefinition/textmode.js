/**
 * @title TextmodeLayer.ortho
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const scene = t.layers.add();
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(8, 10, 18);
	scene.ortho();
	scene.camera(0, 0, 44);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});

function drawText(text, x, y, rgb = [220, 230, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

scene.draw(() => {
	t.clear();
	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate((i - 1) * 10, 0, i * -12);
		t.rotateY(t.frameCount * 2 + i * 20);
		t.char('+');
		t.charColor(120 + i * 40, 220, 255);
		t.box(8, 8, 8);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODELAYER.ORTHO', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: ORTHOGRAPHIC CAMERA', x, y++, [100, 220, 255]);
	drawText('Depth no longer changes scale.', x, y++, [140, 160, 190]);
	drawText('Boxes stay evenly sized.', x, y++, [140, 160, 190]);
});
