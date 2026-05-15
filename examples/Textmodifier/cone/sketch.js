/**
 * @title Textmodifier.cone
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let radius = 0,
	height = 0;

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.cellColor(0, 0, 0);

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

	drawCenteredText('Textmodifier.cone', -12, [240, 245, 255]);
	drawCenteredText('A 3D cone primitive defined by radius and height.', -10, [150, 170, 200]);

	drawCenteredText(`RADIUS: ${radius.toFixed(1)}`, 8, [140, 180, 255]);
	drawCenteredText(`HEIGHT: ${height.toFixed(1)}`, 10, [255, 225, 140]);

	drawCenteredText('t.cone(radius, height)', 13, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;

	radius = 6 + Math.sin(time) * 2;
	height = 12 + Math.cos(time * 0.7) * 4;

	t.ambientLight(30, 40, 60);
	t.pointLight([255, 225, 140], 0, -20, 30);
	t.camera(15, -10, 40, 0, 2, 0);

	t.push();
	t.rotateX(time * 20);
	t.rotateY(time * 30);
	t.char('#');
	t.charColor(140, 180, 255);
	t.cellColor(20, 30, 60);

	t.cone(radius, height);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
